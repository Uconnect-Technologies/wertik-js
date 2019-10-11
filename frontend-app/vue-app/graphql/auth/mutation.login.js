export default `
  mutation login($email: String, $password: String) {
    login(input: { email: $email, password: $password }) {
      accessToken
      username
      email
      profile {
        id
        name
      }
    }
  }
`
