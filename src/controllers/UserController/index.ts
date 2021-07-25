import { Request, Response } from 'express'
import { hash } from 'bcryptjs'

import { UserModel } from '../../models'

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, email, password, admin } = request.body

    if (!name) {
      throw new Error('Insira um nome válido.')
    }

    if (!email) {
      throw new Error('Insira um email válido.')
    }

    if (!password) {
      throw new Error('Insira uma senha válida.')
    }

    if (password && password.length < 6) {
      throw new Error('Sua senha precisa ter 6 caracteres no mínimo.')
    }

    const userAlreadyExists = await UserModel.findOne({ email })
    if (userAlreadyExists) {
      throw new Error('Usuário já cadastrado.')
    }

    const passwordHash = await hash(password, 8)

    const user = await new UserModel({ name, email, password: passwordHash, admin }).save()

    return response.json(user)
  }

  async updateUserName(request: Request, response: Response) {
    const { user_id } = request
    const { name } = request.params

    console.log(user_id, name)
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
