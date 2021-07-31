interface IChangePasswordEmailHTMLProps {
  name: string
  token: string
}

export const changePasswordEmailHTML = ({ name, token }: IChangePasswordEmailHTMLProps) => {
  const html = `
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
            <p>Você enviou um pedido para trocar sua senha de acesso à plataforma. Clique no botão abaixo para redefinir sua senha.</p>
            <a href="${process.env.ORIGIN}/alterar-senha/${token}">
            <div class="button">Confirmar e-mail</div>
            </a>
          </div>
        </div>
      </body>
    </html>
    `

  return html
}
