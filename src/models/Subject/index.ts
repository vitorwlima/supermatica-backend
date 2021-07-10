import { Schema, model } from 'mongoose'

interface ISubject {
  subjectText: string
  questions: Schema.Types.ObjectId[]
}

const schema = new Schema<ISubject>(
  {
    subjectText: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  },
  { timestamps: true }
)

export const SubjectModel = model<ISubject>('Subject', schema)
