import { Request, Response } from 'express'
import { AlternativeModel, QuestionModel } from '../../models'

export class AlternativeController {
  async createAlternative(request: Request, response: Response) {
    const { alternativeText, isCorrect, questionId } = request.body

    if (!alternativeText) {
      throw new Error('Texto da alternativa não foi inserido.')
    }

    const question = await QuestionModel.findById(questionId)
    if (!question) {
      throw new Error('Pergunta não encontrada.')
    }

    const alternative = await new AlternativeModel({ alternativeText, isCorrect, questionId }).save()
    question.alternatives.push(alternative._id)
    question.save()

    return response.json(alternative)
  }

  async deleteAlternative(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const alternative = await AlternativeModel.findByIdAndDelete(id)

      const question = await QuestionModel.findById(alternative.questionId)
      question.alternatives = question.alternatives.filter(id => id.toString() !== alternative._id.toString())
      question.save()

      return response.json(alternative)
    }

    throw new Error('Alternativa não encontrada.')
  }
}
