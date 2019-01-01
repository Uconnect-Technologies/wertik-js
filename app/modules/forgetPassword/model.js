import Model from "./../../../framework/model/model.js";
import {sendEmail} from "./../../../framework/mailer/index.js";

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
						subject: `Reset your account password for ${process.env.APP_NAME}`,
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
}

export default new ForgetPasswordModel();