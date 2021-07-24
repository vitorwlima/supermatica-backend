import dayjs from 'dayjs'
import { sign } from 'jsonwebtoken'
import { RefreshTokenModel, UserModel } from '../../models'

export const generateAccessToken = (userId: string) => {
  const accessToken = sign({}, process.env.TOKEN_HASH, { subject: userId.toString(), expiresIn: '15m' })

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
