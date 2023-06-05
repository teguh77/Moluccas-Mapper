import { mongooseConnect } from '@/lib/db';
import Maluku from '@/models/maluku';
import type { NextApiRequest, NextApiResponse } from 'next';

function calculatePercentage(num1: number, num2: number) {
  return (num1 / num2) * 100;
}
function formatPercentage(value: number): number {
  return Number.isInteger(value) ? value : Math.floor(value);
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
              offenseCount: offenseCount.offense.length,
            };
          }),
        );

        const amanLength = populatedMaluku.filter(
          (doc) => doc.offenseCount === 0,
        ).length;
        const waspadaLength = populatedMaluku.filter(
          (doc) => doc.offenseCount === 1,
        ).length;
        const rawanLength = populatedMaluku.filter(
          (doc) => doc.offenseCount > 1,
        ).length;

        // await db.disconnect();
        res.json({
          aman: formatPercentage(
            calculatePercentage(amanLength, maluku.length),
          ),
          waspada: formatPercentage(
            calculatePercentage(waspadaLength, maluku.length),
          ),
          rawan: formatPercentage(
            calculatePercentage(rawanLength, maluku.length),
          ),
        });
      } catch (error) {
        console.log(error);
        // await db.disconnect();
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
