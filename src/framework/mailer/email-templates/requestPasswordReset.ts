export default `
  <p>
    Hi,
  </p>

  <p>
    Action taken for resetting {{ email }} password.
  </p>

  <p>
    Your token is: {{ token }}
  </p>

  <p>
    You can reset your password <a href="{{frontendAppPasswordResetUrl}}?token={{token}}">Here</a>. This
    email is valid for next 30 minutes, The link will expire on {{ nextMinutes}}.
  </p>

  <p>
    Thanks, <br />
    {{siteName}} Team
  </p>
`
