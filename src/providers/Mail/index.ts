import nodemailer from 'nodemailer'

interface ISendConfirmationEmailProps {
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
    html: `
    <html>
      <head>
        <style>
          .content {
            display: grid;
            place-items: center;
            text-align: center;
            color: black;
          }

          img {
            max-width: 220px;
          }

          .image-link {
            padding-bottom: 16px;
            border-bottom: 2px solid #EEEEEE;
          }

          h1 {
            color: #209FF3
          }

          p {
            font-size: 20px;
          }

          a {
            text-decoration: none;
            font-size: 24px;
          }

          .button {
            width: max-content;
            border-radius: 6px;
            padding: 12px 24px;
            background-color: #209FF3;
            color: white;
            transition: 0.3s;
            margin: 0 auto;
          }

          .button:hover {
            background-color: #0275C0;
          }
        </style>
      </head>

      <body>
        <div class="content">
          <a href="${process.env.ORIGIN}" class="image-link">
            <img src="https://i.imgur.com/AnFvp73.png" alt="Supermática"/>
          </a>
          <div>
            <h1>Olá, ${name}!</h1>
            <p>Confirme seu email clicando no botão abaixo:</p>
            <a href="${process.env.ORIGIN}/confirmar-conta/${token}">
            <div class="button">Confirmar e-mail</div>
            </a>
          </div>
        </div>
      </body>
    </html>
    `,
  })

  return info
}
