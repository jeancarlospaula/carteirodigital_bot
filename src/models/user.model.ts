import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  chatId: string
  firstName: string
  username: string
  acceptedTerms?: boolean
}

const UserSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    acceptedTerms: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = model<IUser>('Users', UserSchema)

export { User }
