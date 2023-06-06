import { mongooseConnect } from '@/lib/db';
import Maluku from '@/models/maluku';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await mongooseConnect();

  switch (method) {
    case 'GET':
      try {
        const malukuData = await Maluku.find(
          {},
          'properties.provinsi properties.kota',
        )
          .where('properties.kota')
          .exists(true)
          .exec();

        res.json(malukuData);
      } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
