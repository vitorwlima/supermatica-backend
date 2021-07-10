import { Request, Response } from 'express'
import { SubjectModel } from '../../models'

export class SubjectController {
  async createSubject(request: Request, response: Response) {
    const { subjectText } = request.body
    if (!subjectText) {
      throw new Error('Insira uma matéria válida.')
    }

    const subject = await new SubjectModel({ subjectText }).save()

    return response.json(subject)
  }

  async getSubject(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const subject = await SubjectModel.findById(id).populate('questions')
      if (!subject) {
        throw new Error('Matéria não encontrada')
      }

      return response.json(subject)
    }

    const subjects = await SubjectModel.find()

    return response.json(subjects)
  }
}
