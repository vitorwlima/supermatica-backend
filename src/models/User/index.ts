import { Schema, model, Types } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
  admin: boolean
  refreshToken: Types.ObjectId
}

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  refreshToken: { type: Types.ObjectId, ref: 'RefreshToken' }
}, { timestamps: true })

export const UserModel = model<IUser>('User', schema)