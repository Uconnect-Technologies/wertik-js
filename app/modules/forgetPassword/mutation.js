const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  requestPasswordReset(email: String): ForgetPassword
  resetPassword(token: String, password: String, confirmPassword: String): ForgetPassword
`;
