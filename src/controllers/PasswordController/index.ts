import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'
import { UserModel } from '../../models'
import { generateChangePasswordToken, sendChangePasswordEmail, sendForgotPasswordEmail } from '../../providers'

export class PasswordController {
  async sendChangePassword(request: Request, response: Response) {
    const { user_id } = request

    const user = await UserModel.findById(user_id)
    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    const token = generateChangePasswordToken(user_id)

    await sendChangePasswordEmail({ email: user.email, name: user.name, token })

    return response.end()
  }

  async changePassword(request: Request, response: Response) {
    const { user_id } = request
    const { password, urlToken } = request.body

    try {
      const { sub } = verify(urlToken, process.env.TOKEN_HASH!)

      const userReceived = await UserModel.findById(user_id)
      const userToken = await UserModel.findById(sub)
      if (!userReceived || !userToken) {
        throw new Error('Usuário não encontrado.')
      }

      if (userToken._id.toString() !== userReceived._id.toString()) {
        return response.status(401).end()
      }

      const passwordHash = await hash(password, 8)

      await UserModel.findByIdAndUpdate(user_id, { password: passwordHash })
      response.cookie('refreshToken', '', { httpOnly: true })

      return response.end()
    } catch {
      return response.status(401).end()
    }
  }

  async sendForgotPassword(request: Request, response: Response) {
    const { email } = request.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('Email não cadastrado.')
    }

    const token = generateChangePasswordToken(user._id)

    await sendForgotPasswordEmail({ email, name: user.name, token })

    return response.end()
  }

  async changeForgottenPassword(request: Request, response: Response) {
    const { password, urlToken } = request.body

    try {
      const { sub } = verify(urlToken, process.env.TOKEN_HASH!)

      const passwordHash = await hash(password, 8)

      await UserModel.findByIdAndUpdate(sub, { password: passwordHash }, { runValidators: true })

      response.cookie('refreshToken', '', { httpOnly: true })

      return response.end()
    } catch {
      return response.status(401).end()
    }
  }
}
