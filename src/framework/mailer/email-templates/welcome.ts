export default `
  <p>
    Hi {{userName}}, Welcome to {{siteName}}
  </p>
  
  <p>
    Thanks for joining {{siteName}}, This email is to inform you that you have joined {{siteName}} on {{ date }}, <a target="_blank" href="{{activationUrl}}?token={{activationToken}}">Click Here</a> to verify your account.
  </p>

  <p>
    Thanks <br />
    {{ siteName }} Team.
  </p>
`;