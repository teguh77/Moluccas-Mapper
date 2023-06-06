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

const malukuSchema = new Schema<MalukuDocument>({
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

malukuSchema.virtual('offenseCount').get(function (this: MalukuDocument) {
  return this.offense?.length;
});

malukuSchema.set('toJSON', { virtuals: true });

const Maluku = models.Maluku || model<MalukuDocument>('Maluku', malukuSchema);

export default Maluku;
