import dbConnect from '@/lib/dbConnect';
import Offense from '@/models/offense';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const offense = await Offense.find({}).sort({ createdAt: -1 }).limit(3);

        res.status(200).json(offense);
      } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
