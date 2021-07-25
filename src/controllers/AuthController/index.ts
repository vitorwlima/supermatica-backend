import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import dayjs from 'dayjs'

import { RefreshTokenModel, UserModel } from '../../models'
import { generateAccessToken, generateRefreshToken } from '../../providers'

export class AuthController {
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

    await RefreshTokenModel.deleteMany({ userId: user._id })

    const token = generateAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id.toString())

    response.cookie('refreshToken', refreshToken._id.toString(), { httpOnly: true })

    return response.json({ user, token, refreshToken })
  }

  async authenticateAdmin(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('Email não cadastrado.')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Senha incorreta.')
    }

    const isAdmin = user.admin
    if (!isAdmin) {
      throw new Error('Usuário não autorizado.')
    }

    await RefreshTokenModel.deleteMany({ userId: user._id })

    const token = generateAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id.toString())

    return response.json({ user, token, refreshToken })
  }

  async getTokenByRefresh(request: Request, response: Response) {
    const refreshTokenId = request.cookies.refreshToken

    const refreshToken = await RefreshTokenModel.findById(refreshTokenId)
    if (!refreshToken) {
      throw new Error('Refresh token inválido.')
    }

    const user = await UserModel.findById(refreshToken.userId)

    await RefreshTokenModel.deleteMany({ userId: refreshToken.userId.toString() })
    const newRefreshToken = await generateRefreshToken(refreshToken.userId.toString())

    const token = generateAccessToken(refreshToken.userId.toString())

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
    if (refreshTokenExpired) {
      return response.status(401).end()
    }

    response.cookie('refreshToken', newRefreshToken._id.toString(), { httpOnly: true })

    return response.json({ user, token, refreshToken: newRefreshToken })
  }
}
