let { ApolloError } = require("apollo-server");

export default `
  requestPasswordReset(input: ForgetPasswordInput): ForgetPassword
  resetPassword(input: ForgetPasswordInput): ForgetPassword
`;
