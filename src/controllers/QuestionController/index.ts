import { Request, Response } from 'express'
import { AlternativeModel, QuestionModel, SubjectModel, UserModel } from '../../models'

export class QuestionController {
  async createQuestion(request: Request, response: Response) {
    const { questionText, resolution, subjectId, tags } = request.body

    const subject = await SubjectModel.findById(subjectId)
    if (!subject) {
      throw new Error('Matéria não encontrada.')
    }

    const question = await new QuestionModel({ questionText, resolution, subjectId, tags }).save()
    subject.questions.push(question._id)
    subject.save()

    return response.json(question)
  }

  async getQuestion(request: Request, response: Response) {
    const { id } = request.params

    const question = await QuestionModel.findById(id).populate('alternatives')
    if (!question) {
      throw new Error('Exercício não encontrado.')
    }

    return response.json(question)
  }

  async getQuestions(request: Request, response: Response) {
    const { slug } = request.params

    const subject = await SubjectModel.findOne({ slug })
    if (!subject) {
      throw new Error('Conteúdo não encontrado.')
    }

    const questions = await QuestionModel.find({ subjectId: subject._id })

    return response.json(questions)
  }

  async updateQuestion(request: Request, response: Response) {
    const { id } = request.params
    const data = request.body

    const question = await QuestionModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    if (!question) {
      throw new Error('Exercício não encontrado.')
    }

    question.alternatives = []
    question.save()

    return response.json(question)
  }

  async deleteQuestion(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const question = await QuestionModel.findByIdAndDelete(id)
      if (!question) {
        throw new Error('Pergunta não encontrada.')
      }

      const subject = await SubjectModel.findById(question.subjectId)
      if (!subject) {
        throw new Error('Conteúdo não encontrado.')
      }

      subject.questions = subject.questions.filter(id => id.toString() !== question._id.toString())
      subject.save()

      await AlternativeModel.deleteMany({ questionId: question._id })

      return response.json(question)
    }

    throw new Error('Pergunta não encontrada.')
  }

  async answerQuestion(request: Request, response: Response) {
    const { user_id } = request
    const { questionId, isCorrect } = request.body

    const user = await UserModel.findById(user_id)
    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    if (user.answeredQuestions.some(question => question.questionId === questionId)) {
      return response.end()
    }

    const answeredQuestion = { questionId, isCorrect }
    user.answeredQuestions.push(answeredQuestion)
    user.save()

    return response.end()
  }
}
