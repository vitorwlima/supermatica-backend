import { Schema, model, Types } from 'mongoose'

interface ISubject {
  subjectText: string
  questions: Types.ObjectId[]
}

const schema = new Schema<ISubject>(
  {
    subjectText: { type: String, required: true },
    questions: [{ type: Types.ObjectId, ref: 'Question' }],
  },
  { timestamps: true }
)

export const SubjectModel = model<ISubject>('Subject', schema)
