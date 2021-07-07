import { Request, Response } from 'express';
import { UserModel } from '../../models';

import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class UserController {
  async createUser(request: Request, response: Response) {
    const data = request.body
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

  async getUsers(request: Request, response: Response) {
    const { id } = request.params

    if (request.params && id) {
      const user = await UserModel.findById(id)
      if (!user) {
        throw new Error('Usuário não encontrado.')
      }

      return response.json(user)
    }

    const users = await UserModel.find()

    return response.json(users)
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('Email não cadastrado.')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Senha incorreta.')
    }

    const token = sign({ email }, process.env.TOKEN_HASH, { subject: user._id.toString(), expiresIn: '1d' })

    return response.json(token)
  }
}