export default `
	mutation login($email: String, $password: String) {
	  login(input: {email: $email, password: $password}) {
	    _id
	    accessToken
	    name
	    username
	    password
	  }
	}
`