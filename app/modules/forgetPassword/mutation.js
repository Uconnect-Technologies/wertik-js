export default `
  requestPasswordReset(email: String): ForgetPassword
  resetPassword(token: String, password: String, confirmPassword: String): ForgetPassword
`;
