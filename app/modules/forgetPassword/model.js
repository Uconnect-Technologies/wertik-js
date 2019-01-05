import Model from "@framework/model/model.js";
import {sendEmail} from "@framework/mailer/index.js";
import {encrypt,decrypt} from "@framework/security/password.js";
import moment from "moment";

class ForgetPasswordModel extends Model {
	constructor() {
		super({
			tableName: "forget_password"
		});
	}
	async requestPasswordReset(_,args) {
		try {
			let {email, returnUrl} = args;
			if (email && returnUrl) {
				let user = await this.models.user.findOne({
					where: {
						email: email
					}
				});
				if (user) {
					let token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
					sendEmail('requestPasswordResetToken.hbs',{
						email: email,
						nextMinutes:  `${moment().add('30','minutes').format("dddd, MMMM Do YYYY, h:mm:ss a")}`
					},{
						from: 'ilyas.datoo@gmail.com',
						to: email,
						subject: `Reset your account password for ${process.env.NAME}`,
					});
					await this.model.create({
						token: token,
						userId: user.id,
						email: email,
						expireDate: `${moment().add('30','minutes').valueOf()}`
					});
					return {
						successMessageType: "Successfull",
						successMessage:  "Please check your email. We have sent a link to reset your email",
						statusCode: 'CREATED'
					};
				}else {
					return {
						errorMessage: "No User found",
						errorMessageType: "No user found with that email",
						statusCode: 'BAD_REQUEST'
					};
				}
			}else {
				return {
					errorMessage: "Email and Return Url not provided",
					errorMessageType: "Please provide your Email and Return Url",
					statusCode: 'BAD_REQUEST'
				};
			}
		} catch (e) {
			return {
				errorMessageType: "Error from our side",
				errorMessage: e.message,
				statusCode: 'INTERNAL_SERVER_ERROR'
			};
		}
	}
	async resetPassword(_,args) {
		try {
			let { token, email, password } = args;
			if (token && email && password) {
				let forgetPasswordItem = await this.model.findOne({
					where: {
						email: email
					}
				});
				if (forgetPasswordItem) {
					let user = await this.models.user.findOne({
						where: {
							email: email
						}
					});
					if (user) {
						sendEmail('changePassword.hbs',{
							email: email,
							siteName: process.env.NAME,
							userName: email,
						},{
							from: 'ilyas.datoo@gmail.com',
							to: email,
							subject: `Password changed for ${process.env.NAME}`,
						});
						await user.updateAttributes({
							password: encrypt(password),
						});
						await this.model.destroy({
							where: {
								token: token 
							}
						});
						return {
							successMessageType: "Password Changed", 
							successMessage: `Password successfully changed for ${user.email}`,
							statusCode: 'CREATED'
						}
					}else {
						return {
							errorMessageType: "User Not Found",
							errorMessage: "User not found to update password.",
							statusCode: 'BAD_REQUEST'
						}
					}
				}else {
					return {
						errorMessageType: "Token Mismatched",
						errorMessage: "The token you provided is mismatched or expired.",
						statusCode: 'BAD_REQUEST'
					}
				}
			}else {
				return {
					errorMessageType: "Details not provided",
					errorMessage: "Please provide Token, Email and/or Password",
					statusCode: 'BAD_REQUEST'
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: "Something went wrong from our side. Message: " + e.message,
				statusCode: 'INTERNAL_SERVER_ERROR'
			}
		}	
	}
	async forgetPasswordView(_,args) {
		try {
			const {id} = args;
			if (id) {
				let forgetPasswordItem = await this.model.findByPk(id);
				if (forgetPasswordItem) {
					forgetPasswordItem.successMessageType = "Fetched Successfully";
					forgetPasswordItem.statusCode = "OK";
					forgetPasswordItem.successMessage = "Forget password item fetched successfully";
					return forgetPasswordItem;
				}else {
					return {
						errorMessageType: "Not found",
						errorMessage: "Forget password item not found",
						statusCode: 'BAD_REQUEST'
					}
				}
			}else {
				return {
					errorMessageType: "Details not provided",
					errorMessage: "Please provide id for forget password",
					statusCode: 'BAD_REQUEST'
				}
			}
			return {
				email: "asdas",
				token: "asasd"
			}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: "Something went wrong from our side. Message: " + e.message,
				statusCode: 'INTERNAL_SERVER_ERROR'
			}
		}
	}
}

export default new ForgetPasswordModel();