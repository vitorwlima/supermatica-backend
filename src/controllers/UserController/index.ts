import { Request, Response } from 'express'

import { UserModel } from '../../models'

export class UserController {
  async updateUserName(request: Request, response: Response) {
    const { user_id } = request
    const { name } = request.body

    const user = await UserModel.findByIdAndUpdate(user_id, { name }, { new: true, runValidators: true })
    return response.json(user)
  }

  async getUsers(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const user = await await UserModel.findById(id)
      if (!user) {
        throw new Error('Usuário não encontrado.')
      }

      return response.json(user)
    }

    const users = await UserModel.find()

    return response.json(users)
  }

  async getAdmin(request: Request, response: Response) {
    const { user_id } = request

    const user = await UserModel.findById(user_id)

    return response.json(user)
  }

  async deleteUser(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const user = await UserModel.findByIdAndDelete(id)
      if (!user) {
        throw new Error('Usuário não encontrado.')
      }

      return response.json(user)
    }

    throw new Error('Insira um ID de usuário válido.')
  }
}
