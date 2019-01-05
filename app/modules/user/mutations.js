import UserSchema from "./schema.js";
import UserController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

const UserMutations = {
	login: {
		name: "Login",
		description: "Mutation for login",
		type: UserSchema,
		args: {
			...queryMutationArgument('email','string'),
			...queryMutationArgument('password','string'),
		},
		async resolve(_,args) {
			return await UserController.login(_,args);
		}
  },
  activateAccount :{
    type: UserSchema,
    args: {
      ...queryMutationArgument('activationToken','string')
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
      ...queryMutationArgument('email','string'),
      ...queryMutationArgument('password','string'),
      ...queryMutationArgument('confirm_password','string')
    },
    async resolve(_, args) {
      return await UserController.signup(_, args);
    }
  },
  changePassword: {
    type: UserSchema,
    args: {
      ...queryMutationArgument('id','number'),
      ...queryMutationArgument('oldPassword','string'),
      ...queryMutationArgument('newPassword','string')
    },
    resolve(_, args) {
      return UserController.changePassword(_, args);
    }
  },
  refreshToken: {
    type: UserSchema,
    args: {
      ...queryMutationArgument('id','number'),
      ...queryMutationArgument('refreshToken','string'),
    },
    resolve(_, args) {
      return UserController.refreshToken(_, args);
    }
  },
  updateProfile: {
    type: UserSchema,
    args: {
      ...queryMutationArgument('id','number'),
      ...queryMutationArgument('name','string'),
      ...queryMutationArgument('gender','string'),
    },
    resolve(_, args) {
      return UserController.updateProfile(_,args)
    }
  }
}

export default UserMutations;