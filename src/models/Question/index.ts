import { Schema, model } from 'mongoose'

interface IQuestion {
  questionText: string
  subjectId: Schema.Types.ObjectId
  alternatives: Schema.Types.ObjectId[]
}

const schema = new Schema<IQuestion>(
  {
    questionText: { type: String, required: true },
    alternatives: [{ type: Schema.Types.ObjectId, ref: 'Alternative' }],
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
  },
  { timestamps: true }
)

export const QuestionModel = model<IQuestion>('Question', schema)
