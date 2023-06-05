import { mongooseConnect } from '@/lib/db';
import Maluku from '@/models/maluku';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await mongooseConnect();
        const malukuData = await Maluku.find(
          {},
          'properties.provinsi properties.kota',
        )
          .where('properties.kota')
          .exists(true)
          .exec();
        // await db.disconnect();
        res.json(malukuData);
      } catch (error) {
        console.log(error);
        // await db.disconnect();
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
