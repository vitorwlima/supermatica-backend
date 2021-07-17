import dayjs from 'dayjs'
import { sign } from 'jsonwebtoken'
import { RefreshTokenModel, UserModel } from '../../models'

interface IAccessTokenProps {
  email?: string
  userId: string
}

export const generateAccessToken = async ({ email, userId }: IAccessTokenProps) => {
  let useEmail = email || ''
  if (!email) {
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new Error('Usuário inválido.')
    }

    useEmail = user.email
  }

  const accessToken = sign({ email: useEmail }, process.env.TOKEN_HASH, { subject: userId.toString(), expiresIn: '1d' })

  return accessToken
}

export const generateRefreshToken = async (userId: string) => {
  const expiresIn = dayjs().add(7, 'day').unix()

  const refreshToken = await new RefreshTokenModel({ userId, expiresIn }).save()

  const user = await UserModel.findById(userId)
  user.refreshToken = refreshToken._id
  user.save()

  return refreshToken
}
