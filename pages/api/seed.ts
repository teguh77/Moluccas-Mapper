import { mongooseConnect } from '@/lib/db';
import Maluku from '@/models/maluku';
import Offense from '@/models/offense';
import type { NextApiRequest, NextApiResponse } from 'next';

const offenses: OffenseValue[] = [
  {
    area: '647e0523ebc39ea7b7ba588a',
    nama: 'PT. Sinar Terang',
    pelanggaran: 'Melakukan importasi baju bekas',
    provinsi: 'Maluku',
    kecamatan: 'Nusaniwe',
    desa: 'Salobar',
  },
  {
    area: '647e0523ebc39ea7b7ba588a',
    nama: 'PT. Maju Katong',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Teluk Ambon',
    desa: 'Poka',
  },
  {
    area: '647e0523ebc39ea7b7ba588a',
    nama: 'PT. Pelayaran Nasional',
    pelanggaran: 'Melakukan importasi ikan ilegal',
    provinsi: 'Maluku',
    kecamatan: 'Teluk Ambon',
    desa: 'Poka',
  },
  {
    area: '647e0523ebc39ea7b7ba588a',
    nama: 'PT. Sinar Indo Jaya',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Sirimau',
    desa: 'Ahusen',
  },
  {
    area: '647e0523ebc39ea7b7ba588a',
    nama: 'PT. Sarana Maluku Ventura',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Sirimau',
    desa: 'Amantelu',
  },
  // Maluku Tengah
  {
    area: '647e0523ebc39ea7b7ba5888',
    nama: 'PT. Citra Mutiara',
    pelanggaran: 'Melakukan importasi baju bekas',
    provinsi: 'Maluku',
    kecamatan: 'Haria',
    desa: 'Hooi',
  },
  {
    area: '647e0523ebc39ea7b7ba5888',
    nama: 'PT. Indaco Warna',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Paperu',
    desa: 'Teon',
  },
  {
    area: '647e0523ebc39ea7b7ba5888',
    nama: 'PT. Doc Perkapalan',
    pelanggaran: 'Melakukan importasi ikan ilegal',
    provinsi: 'Maluku',
    kecamatan: 'Saparua',
    desa: 'Amahai',
  },
  // Buru
  {
    area: '647e0523ebc39ea7b7ba5889',
    nama: 'PT. Serkolinas',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Namlea',
    desa: 'Jamilu',
  },
  {
    area: '647e0523ebc39ea7b7ba5889',
    nama: 'PT. Maluku Pearl',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Air Buaya',
    desa: 'Waepure',
  },
  {
    area: '647e0523ebc39ea7b7ba5889',
    nama: 'PT. Tempo Scan Group',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Waplau',
    desa: 'Samalagi',
  },
  {
    area: '647e0523ebc39ea7b7ba5889',
    nama: 'PT. Pelayaran Sumber Rejeki',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku',
    kecamatan: 'Batabual',
    desa: 'Waemurat',
  },
  // Halmahera Utara
  {
    area: '647e0523ebc39ea7b7ba5882',
    nama: 'CV. Halmahera Baru',
    pelanggaran: 'Melakukan penjualan MMEA tanpa NPPBKC',
    provinsi: 'Maluku Utara',
    kecamatan: 'Galela',
    desa: 'Bobaneigo',
  },
  {
    area: '647e0523ebc39ea7b7ba5882',
    nama: 'PT. Warehouse Binatel',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku Utara',
    kecamatan: 'Kao',
    desa: 'Gamsungi',
  },
  {
    area: '647e0523ebc39ea7b7ba5882',
    nama: 'PT. Nusa Halmahera Minerals',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku Utara',
    kecamatan: 'Kao Barat',
    desa: 'Makaeling',
  },
  {
    area: '647e0523ebc39ea7b7ba5882',
    nama: 'PT. Tri Usaha Baru',
    pelanggaran: 'Melakukan penjualan MMEA tanpa NPPBKC',
    provinsi: 'Maluku Utara',
    kecamatan: 'Kao Teluk',
    desa: 'Pasir Putih',
  },
  // Pulau morotai
  {
    area: '647e0523ebc39ea7b7ba587f',
    nama: 'PT. Eraskom Jaya Abadi',
    pelanggaran: 'Melakukan penjualan rokok tanpa dilekati pita cukai',
    provinsi: 'Maluku Utara',
    kecamatan: 'Pulau Rao',
    desa: 'Leo Leo',
  },
  {
    area: '647e0523ebc39ea7b7ba587f',
    nama: 'PT. Alam Indah Sejahtera',
    pelanggaran: 'Melakukan penjualan MMEA tanpa NPPBKC',
    provinsi: 'Maluku Utara',
    kecamatan: 'Morotai Timur',
    desa: 'Gamlamo',
  },
  // Kota Ternate
  {
    area: '647e0523ebc39ea7b7ba5876',
    nama: 'PT. Indah Sejahtera',
    pelanggaran: 'Melakukan penjualan MMEA tanpa NPPBKC',
    provinsi: 'Maluku Utara',
    kecamatan: 'Moti',
    desa: 'Gambesi',
  },
];

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
  const { method } = req;
  await mongooseConnect();

  switch (method) {
    case 'GET':
      try {
        for (const offense of offenses) {
          const maluku = await Maluku.findOne({ _id: offense.area });

          if (!maluku) {
            res.status(500).json({ message: 'reference error' });
            return;
          }

          const newOffense = new Offense({
            nama: offense.nama,
            pelanggaran: offense.pelanggaran,
            provinsi: offense.provinsi,
            kota: maluku.properties.kota,
            kecamatan: offense.kecamatan,
            desa: offense.desa,
            area: offense.area,
          });

          await newOffense.save();
          maluku.offense.push(newOffense._id);
          await maluku.save();
        }

        res.status(200).json({ message: 'offenses recorded' });
      } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
