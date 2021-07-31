interface IConfirmationEmailHTMLProps {
  name: string
  email: string
  message: string
}

export const contactMessageHTML = ({ name, email, message }: IConfirmationEmailHTMLProps) => {
  const html = `
    <html>
      <head>
        <style>
          p {
            font-size: 16px;
          }
        </style>
      </head>

      <body>
        <div>
          <h1>Mensagem de contato enviado por ${name}, cujo email é ${email}</h1>
          <p>${message}</p>
        </div>
      </body>
    </html>
    `

  return html
}
