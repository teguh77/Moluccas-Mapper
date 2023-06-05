import db from '@/lib/db';
import Offense from '@/models/offense';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await db.connect();
        const offense = await Offense.find({}).sort({ createdAt: -1 }).limit(3);
        await db.disconnect();
        res.status(200).json(offense);
      } catch (error) {
        console.log(error);
        await db.disconnect();
        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
