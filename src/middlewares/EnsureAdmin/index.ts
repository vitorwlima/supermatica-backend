import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models';

export const ensureAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const { user_id } = request

  const { admin } = await UserModel.findById(user_id)
  if (admin) {
    return next()
  }

  return response.status(401).json({
    error: 'Usuário não autorizado.'
  })
}