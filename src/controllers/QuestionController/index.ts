import { Request, Response } from 'express'
import { AlternativeModel, QuestionModel, SubjectModel } from '../../models'

export class QuestionController {
  async createQuestion(request: Request, response: Response) {
    const { questionText, resolution, subjectId } = request.body

    if (!subjectId) {
      throw new Error('Nenhuma matéria selecionada.')
    }

    if (!questionText) {
      throw new Error('Nenhuma questão inserida.')
    }

    if (!resolution) {
      throw new Error('Nenhuma resolução inserida.')
    }

    const subject = await SubjectModel.findById(subjectId)
    if (!subject) {
      throw new Error('Matéria não encontrada.')
    }

    const question = await new QuestionModel({ questionText, resolution, subjectId }).save()
    subject.questions.push(question._id)
    subject.save()

    return response.json(question)
  }

  async getQuestion(request: Request, response: Response) {
    const { id } = request.params

    const question = await QuestionModel.findById(id).populate('alternatives')
    if (!question) {
      throw new Error('Pergunta não encontrada.')
    }

    return response.json(question)
  }

  async getQuestions(request: Request, response: Response) {
    const { subjectId } = request.params

    if (request.params && subjectId) {
      const question = await QuestionModel.find({ subjectId })

      return response.json(question)
    }

    const allQuestions = await QuestionModel.find()

    return response.json(allQuestions)
  }

  async deleteQuestion(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const question = await QuestionModel.findByIdAndDelete(id)
      if (!question) {
        throw new Error('Pergunta não encontrada.')
      }

      const subject = await SubjectModel.findById(question.subjectId)
      subject.questions = subject.questions.filter(id => id.toString() !== question._id.toString())
      subject.save()

      await AlternativeModel.deleteMany({ questionId: question._id })

      return response.json(question)
    }

    throw new Error('Pergunta não encontrada.')
  }
}
