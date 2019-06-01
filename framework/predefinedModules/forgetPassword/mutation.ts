const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
  requestPasswordReset(input: ForgetPasswordInput): ForgetPassword
  resetPassword(input: ForgetPasswordInput): ForgetPassword
`;
