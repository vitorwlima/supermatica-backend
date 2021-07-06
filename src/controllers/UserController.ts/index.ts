import { Request, Response } from 'express';
import { UserModel } from '../../models';

export class UserController {
  async createUser(request: Request, response: Response) {
    const data = request.body
    const { email } = request.body

    const userAlreadyExists = await UserModel.findOne({ email })
    if (userAlreadyExists) {
      throw new Error('Usuário já cadastrado.')
    }

    const user = await new UserModel(data).save()
    
    return response.json(user)
  }
}