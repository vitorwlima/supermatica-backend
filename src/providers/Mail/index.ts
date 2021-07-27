import nodemailer from 'nodemailer'

interface ISendConfirmationEmailProps {
  email: string
  token: string
}

const transport = nodemailer.createTransport({
  host: 'smtp.titan.email',
  pool: true,
  secure: true,
  port: 465,
  auth: {
    user: "contato@supermatica.com.br",
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendConfirmationEmail = async ({ email, token }: ISendConfirmationEmailProps) => {
  const info = await transport.sendMail({
    from: 'Contato Supermática <contato@supermatica.com.br>',
    to: email,
    subject: 'Bem vindo!',
    html: `
    <html>
      <head>
        <style>
          h1 {
            color: red;
          }
        </style>
      </head>

      <body>
        <h1>teste denovo</h1>
        <div>olá amigo</div>
      </body>
    </html>
    `
  })

  return info
}