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
  const { method, body, query } = req;

  switch (method) {
    case 'PUT':
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

        await Offense.updateOne(
          { _id: query.id },
          {
            nama,
            pelanggaran,
            provinsi,
            kota: maluku.properties.kota,
            kecamatan,
            desa,
            area,
          },
        );
        await db.disconnect();
        res.status(200).json({ message: 'offense updated' });
      } catch (err) {
        await db.disconnect();
        res.status(500).json({ message: err });
      }
      break;
    case 'DELETE':
      try {
        await db.connect();
        await Offense.deleteOne({ _id: query.id });
        await db.disconnect();
        res.status(200).json({ message: 'offense deleted' });
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
