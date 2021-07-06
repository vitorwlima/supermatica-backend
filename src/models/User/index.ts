import { Schema, model } from 'mongoose'

interface IUser {
  name: string
  email: string
  password: string
  admin: boolean
}

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false }
})

export const UserModel = model('User', schema)