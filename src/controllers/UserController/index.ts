import { Request, Response } from 'express'

import { UserModel } from '../../models'
import { sendContactMessage } from '../../providers'

export class UserController {
  async updateUserName(request: Request, response: Response) {
    const { user_id } = request
    const { name } = request.body

    const user = await UserModel.findByIdAndUpdate(user_id, { name }, { new: true, runValidators: true })
    return response.json(user)
  }

  async sendContactMessage(request: Request, response: Response) {
    const { user_id } = request
    const { message } = request.body

    if (!message) {
      throw new Error('Insira uma mensagem válida.')
    }

    const { name, email } = await UserModel.findById(user_id)

    await sendContactMessage({ name, email, message })

    return response.end()
  }
}
