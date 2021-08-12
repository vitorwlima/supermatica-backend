import { Request, Response } from 'express'
import slugify from 'slugify'
import { AlternativeModel, QuestionModel, SubjectModel } from '../../models'

export class SubjectController {
  async createSubject(request: Request, response: Response) {
    const { subjectText } = request.body
    if (!subjectText) {
      throw new Error('Insira uma matéria válida.')
    }

    const slug = slugify(subjectText, { lower: true })

    const subject = await new SubjectModel({ subjectText, slug }).save()

    return response.json(subject)
  }

  async getSubject(request: Request, response: Response) {
    const { slug } = request.params

    if (request.params && slug) {
      const subject = await SubjectModel.findOne({ slug }).populate('questions')
      if (!subject) {
        throw new Error('Matéria não encontrada.')
      }

      return response.json(subject)
    }

    const subjects = await SubjectModel.find()

    return response.json(subjects)
  }

  async updateSubject(request: Request, response: Response) {
    const { id } = request.params
    const { subjectText } = request.body

    if (!subjectText) {
      throw new Error('Insira uma matéria válida.')
    }

    const slug = slugify(subjectText, { lower: true })

    const subject = await SubjectModel.findByIdAndUpdate(id, { subjectText, slug }, { new: true, runValidators: true })
    if (!subject) {
      throw new Error('Matéria não encontrada.')
    }

    return response.json(subject)
  }

  async deleteSubject(request: Request, response: Response) {
    const { id } = request.params

    const subject = await SubjectModel.findByIdAndDelete(id)
    if (!subject) {
      throw new Error('Matéria não encontrada.')
    }

    const questions = await QuestionModel.find({ subjectId: id })
    await QuestionModel.deleteMany({ subjectId: id })

    questions.forEach(async question => await AlternativeModel.deleteMany({ questionId: question._id }))

    return response.json(subject)
  }
}
