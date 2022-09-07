import { Schema, model, Types, Document } from 'mongoose'
import { IUser } from './user.model'

export interface IEventAddress {
  type?: string
  city?: string
  state?: string
}

export interface IOrderEvents {
  status: string
  dateUpdate: string
  timeUpdate: string
  location: IEventAddress
  destination: IEventAddress
}

export interface IOrder extends Document {
  user: IUser['_id']
  trackingCode: string
  events: IOrderEvents[]
  delivered: boolean
  notificationSent: boolean
  packageType: string
}

const AddressSchema = {
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
}

const OrderSchema = new Schema(
  {
    trackingCode: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    delivered: {
      type: Boolean,
      required: true,
    },
    notificationSent: {
      type: Boolean,
      required: true,
    },
    packageType: {
      type: String,
      required: false,
    },
    events: [
      {
        status: {
          type: String,
          required: true,
        },
        dateUpdate: {
          type: String,
          required: true,
        },
        timeUpdate: {
          type: String,
          required: true,
        },
        location: AddressSchema,
        destination: AddressSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Order = model<IOrder>('Orders', OrderSchema)

export { Order }
