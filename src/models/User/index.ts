import { Schema, model, Types } from 'mongoose'

interface IAnsweredQuestion {
  questionId: Types.ObjectId
  isCorrect: boolean
}
interface IUser {
  name: string
  email: string
  password: string
  admin: boolean
  confirmed: boolean
  refreshToken: Types.ObjectId
  answeredQuestions: IAnsweredQuestion[]
}

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    confirmed: { type: Boolean, required: true, default: false },
    refreshToken: { type: Types.ObjectId, ref: 'RefreshToken' },
    answeredQuestions: { type: Array, default: [] },
  },
  { timestamps: true }
)

export const UserModel = model<IUser>('User', schema)
