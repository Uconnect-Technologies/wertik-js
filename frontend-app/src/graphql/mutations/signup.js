export default `
	mutation signup($email: String, $password: String, confirmPassword: String) {
		signup(input: {email: $email,password: $password, confirmPassword: $confirmPassword} ) {
			_id
		} 
	}
`