import nodemailer from 'nodemailer'
import { changePasswordEmailHTML } from './changePasswordEmailHTML'
import { confirmationEmailHTML } from './confirmationEmailHTML'
import { contactMessageHTML } from './contactMessageHTML'

interface ISendConfirmationEmailProps {
  email: string
  name: string
  token: string
}

interface ISendContactMessageProps {
  email: string
  name: string
  message: string
}

interface ISendChangePasswordEmailProps {
  email: string
  name: string
  token: string
}

const transport = nodemailer.createTransport({
  host: 'smtp.titan.email',
  pool: true,
  secure: true,
  port: 465,
  auth: {
    user: 'contato@supermatica.com.br',
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const sendConfirmationEmail = async ({ email, name, token }: ISendConfirmationEmailProps) => {
  const info = await transport.sendMail({
    from: 'Contato Supermática <contato@supermatica.com.br>',
    to: email,
    subject: 'Supermática - Confirme o seu email',
    html: confirmationEmailHTML({ name, token }),
  })

  return info
}

export const sendContactMessage = async ({ email, name, message }: ISendContactMessageProps) => {
  const info = await transport.sendMail({
    from: `${name} <contato@supermatica.com.br>`,
    to: 'contato@supermatica.com.br',
    subject: 'Contato de usuário',
    html: contactMessageHTML({ name, email, message }),
  })

  return info
}

export const sendChangePasswordEmail = async ({ email, name, token }: ISendChangePasswordEmailProps) => {
  const info = await transport.sendMail({
    from: `Contato Supermática <contato@supermatica.com.br>`,
    to: email,
    subject: 'Supermática - Troca de senha',
    html: changePasswordEmailHTML({ name, token }),
  })

  return info
}
