import dbConnect from '@/lib/dbConnect';
import Maluku from '@/models/maluku';
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
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
