import { Schema, model, Document } from 'mongoose'

export interface ITrackedOrdersNumber extends Document {
  trackedOrdersNumber: number
}

const trackedOrdersNumber = new Schema(
  {
    trackedOrdersNumber: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const TrackedOrdersNumber = model<ITrackedOrdersNumber>(
  'TrackedOrdersNumber',
  trackedOrdersNumber
)

export { TrackedOrdersNumber }
