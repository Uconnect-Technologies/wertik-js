import UserSchema from "./schema.js";
import UserController from "./controller.js";
import mutationArgument from "@framework/schema/mutationArgument.js";

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
  activateAccount :{
    type: UserSchema,
    args: {
      ...mutationArgument('activationToken','string')
    },
    async resolve(_, args) {
      return await UserController.activateAccount(_, args);
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
  },
  changePassword: {
    type: UserSchema,
    args: {
      ...mutationArgument('id','number'),
      ...mutationArgument('oldPassword','string'),
      ...mutationArgument('newPassword','string')
    },
    resolve(_, args) {
      return UserController.changePassword(_, args);
    }
  },
  refreshToken: {
    type: UserSchema,
    args: {
      ...mutationArgument('id','number'),
      ...mutationArgument('refreshToken','string'),
    },
    resolve(_, args) {
      return UserController.refreshToken(_, args);
    }
  },
  updateProfile: {
    type: UserSchema,
    args: {
      ...mutationArgument('id','number'),
      ...mutationArgument('name','string'),
      ...mutationArgument('gender','string'),
    },
    resolve(_, args) {
      return UserController.updateProfile(_,args)
    }
  }
}

export default UserMutations;