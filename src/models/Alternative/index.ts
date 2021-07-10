import { Schema, model } from 'mongoose'

interface IAlternative {
  alternativeText: string
  isCorrect: boolean
  questionId: Schema.Types.ObjectId
}

const schema = new Schema<IAlternative>(
  {
    alternativeText: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  },
  { timestamps: true }
)

export const AlternativeModel = model<IAlternative>('Alternative', schema)
