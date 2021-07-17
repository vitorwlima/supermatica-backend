import { Schema, model, Types } from 'mongoose'

interface IRefreshToken {
  expiresIn: number
  userId: Types.ObjectId
}

const schema = new Schema<IRefreshToken>({
  expiresIn: { type: Number, required: true },
  userId: { type: Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export const RefreshTokenModel = model<IRefreshToken>('RefreshToken', schema)