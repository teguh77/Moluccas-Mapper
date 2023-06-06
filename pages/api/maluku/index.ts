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
        const maluku = await Maluku.find({});

        const populatedMaluku = await Promise.all(
          maluku.map(async (doc) => {
            const offenseCount = await doc.populate('offense');
            return {
              _id: doc._id,
              type: doc.type,
              geometry: doc.geometry,
              properties: doc.properties,
              offenseCount: offenseCount.offense.length,
            };
          }),
        );

        res.json(populatedMaluku);
      } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
