import { Schema, model, Types } from 'mongoose'

interface IQuestion {
  questionText: string
  subjectId: Types.ObjectId
  alternatives: Types.ObjectId[]
}

const schema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    alternatives: [{ type: Types.ObjectId, ref: 'Alternative' }],
    subjectId: { type: Types.ObjectId, ref: 'Subject' },
  },
  { timestamps: true }
)

export const QuestionModel = model<IQuestion>('Question', schema)
