import UserSchema from "./schema.js";
import UserController from "./controller.js";
import mutationArgument from "./../../../framework/schema/mutationArgument.js";

const UserMutations = {
	login: {
		name: "Login",
		description: "Mutation for login",
		type: UserSchema,
		args: {
			...mutationArgument('email','string'),
			...mutationArgument('password','string'),
		},
		async resolve(_,args) {
			return await UserController.login(_,args);
		}
  },
  signup: {
    type: "Signup",
    description: "Mutation for signup",
    type: UserSchema,
    args: {
      ...mutationArgument('email','string'),
      ...mutationArgument('password','string'),
      ...mutationArgument('confirm_password','string')
    },
    async resolve(_, args) {
      return await UserController.signup(_, args);
    }
  }
}

export default UserMutations;