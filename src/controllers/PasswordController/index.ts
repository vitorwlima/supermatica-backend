import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'
import { UserModel } from '../../models'
import { generateChangePasswordToken, sendChangePasswordEmail } from '../../providers'

export class PasswordController {
  async sendChangePassword(request: Request, response: Response) {
    const { user_id } = request

    const { email, name } = await UserModel.findById(user_id)
    const token = generateChangePasswordToken(user_id)

    await sendChangePasswordEmail({ email, name, token })

    return response.end()
  }

  async changePassword(request: Request, response: Response) {
    const { user_id } = request
    const { password, urlToken } = request.body

    try {
      const { sub } = verify(urlToken, process.env.TOKEN_HASH)

      const userReceived = await UserModel.findById(user_id)
      const userToken = await UserModel.findById(sub)

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
}
