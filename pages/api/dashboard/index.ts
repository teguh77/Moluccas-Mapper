import { mongooseConnect } from '@/lib/db';
import Maluku from '@/models/maluku';
import type { NextApiRequest, NextApiResponse } from 'next';

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
              provinsi: doc.properties.provinsi,
              kota: doc.properties.kota,
              offenseCount: offenseCount.offense.length,
            };
          }),
        );

        populatedMaluku.sort((a, b) => b.offenseCount - a.offenseCount);

        const topFive = populatedMaluku.slice(0, 5);
        const randomizedTopFive = shuffleArray(topFive);

        res.json(randomizedTopFive);
      } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
