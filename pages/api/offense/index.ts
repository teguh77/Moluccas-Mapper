import db from '@/lib/db';
import Maluku from '@/models/maluku';
import Offense from '@/models/offense';
import type { NextApiRequest, NextApiResponse } from 'next';

type OffenseValue = {
  area: string;
  nama: string;
  pelanggaran: string;
  provinsi: string;
  kecamatan: string;
  desa: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        await db.connect();
        const {
          area,
          nama,
          pelanggaran,
          provinsi,
          kecamatan,
          desa,
        }: OffenseValue = body;

        const maluku = await Maluku.findOne({ _id: area });

        if (!maluku) {
          await db.disconnect();
          res.status(500).json({ message: 'referense error' });
          return;
        }

        const offense = new Offense({
          nama,
          pelanggaran,
          provinsi,
          kota: maluku?.properties.kota,
          kecamatan,
          desa,
          area,
        });

        await offense.save();

        maluku.offense.push(offense._id);
        await maluku.save();
        await db.disconnect();
        res.status(200).json({ message: 'offense recorded' });
      } catch (error) {
        console.log(error);
        await db.disconnect();
        res.status(500).json({ message: error });
      }
      break;
    case 'GET':
      try {
        await db.connect();
        const offense = await Offense.find({});
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
