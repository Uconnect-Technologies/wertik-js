import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import {get} from "lodash";

let userModel = new Model({
	models: models,
	tableName: "user"
});

export default {
	activateAccount: (_,args) => {
		try {
			return {name: "Ilyas"}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
	login: async (_,args) => {
		try {
			let { email, password } = args;
			let user = await userModel.findOne({
				where: {email: email}
			});
			let id = get(user,'id',null);
			if (id===null) {
				return {
					errorMessageType: "User not found", 
					errorMessage: "No user found with that email address",
					statusCode: 'BAD_REQUEST'
				}
			}	
			return {
				errorMessageType: "Incorrect Password And/Or Email", 
				errorMessage: "You have entered incorrect Password And/Or Email",
				statusCode: 'BAD_REQUEST'
			}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
	signup: (_,args) => {
		try {
			return {name: "Ilyas"}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
	refreshToken: (_,args) => {
		try {
			return {name: "Ilyas"}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
	userView: (_,args) => {
		try {
			return {name: "Ilyas",message: "This is message view",admin: {name: "Ilyas",age:20,article: {title: "How are you?"}}}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
	changePassword: (_,args) => {
		try {
			return {name: "Ilyas"}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
	updateProfile: (_,args) => {
		try {
			return {name: "Ilyas",message: "HI this is a message"}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: `Message: ${e.message}`
			}
		}
	},
}