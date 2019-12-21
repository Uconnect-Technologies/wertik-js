export default `
<p>
  Hi,
</p>


<p>
  Action taken for resetting {{ email }} password.
</p>

<p>
  You can reset your password <a href="{{frontendAppPasswordResetUrl}}?token={{token}}">Here</a>. This
  email is valid for next 30 minutes until {{nextMinutes}}.
</p>


<p>
  {{siteName}}
</p>
`;
