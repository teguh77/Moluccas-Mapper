import { Schema, models, model, Types } from 'mongoose';

interface IOffense {
  nama: string;
  pelanggaran: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  desa: string;
  area?: Types.ObjectId;
}

const offenseSchema: Schema<IOffense> = new Schema<IOffense>(
  {
    nama: { type: String, required: true },
    pelanggaran: { type: String, required: true },
    provinsi: { type: String, required: true },
    kota: { type: String, required: true },
    kecamatan: { type: String, required: true },
    desa: { type: String, required: true },
    area: { type: Types.ObjectId, ref: 'Maluku', required: true },
  },
  { timestamps: true },
);

const Offense = models.Offense || model<IOffense>('Offense', offenseSchema);

export default Offense;
