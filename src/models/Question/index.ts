import { Schema, model, Types } from 'mongoose'

interface IQuestion {
  questionText: string
  resolution: string
  alternatives: Types.ObjectId[]
  subjectId: Types.ObjectId
  tags: string[]
}

const schema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    resolution: { type: String, required: true },
    alternatives: [{ type: Types.ObjectId, ref: 'Alternative' }],
    subjectId: { type: Types.ObjectId, ref: 'Subject' },
    tags: [{ type: String, required: true, default: [] }],
  },
  { timestamps: true }
)

export const QuestionModel = model<IQuestion>('Question', schema)
