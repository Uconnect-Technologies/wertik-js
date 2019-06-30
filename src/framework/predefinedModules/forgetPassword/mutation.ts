const {dialect} = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  requestPasswordReset(input: ForgetPasswordInput): ForgetPassword
  resetPassword(input: ForgetPasswordInput): ForgetPassword
`;
