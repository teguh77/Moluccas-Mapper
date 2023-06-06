import { Schema, models, model, Types } from 'mongoose';

interface MalukuProperties {
  provinsi: string;
  kota: string;
}

interface MalukuDocument {
  type: string;
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties: MalukuProperties;
  offense: Schema.Types.ObjectId[];
}

const MalukuSchema = new Schema<MalukuDocument>({
  type: { type: String, required: true },
  geometry: {
    type: { type: String, required: true },
    coordinates: { type: [], required: true },
  },
  properties: {
    provinsi: { type: String, required: true },
    kota: { type: String, required: true },
  },
  offense: [{ type: Types.ObjectId, ref: 'Offense' }],
});

MalukuSchema.virtual('offenseCount').get(function (this: MalukuDocument) {
  return this.offense?.length;
});

MalukuSchema.set('toJSON', { virtuals: true });

const Maluku = models.Maluku || model<MalukuDocument>('Maluku', MalukuSchema);

export default Maluku;
