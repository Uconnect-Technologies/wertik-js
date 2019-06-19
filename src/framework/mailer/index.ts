let nodemailer = require('nodemailer');
let handlebars = require("handlebars");

import fs from "fs";

const {
  mailerService,
  mailerServiceUsername,
  mailerServicePassword
} = process.env;

let transporter = nodemailer.createTransport({
	service: mailerService,
	auth: {
		user: mailerServiceUsername,
		pass: mailerServicePassword
	}
});

export async function sendEmail(templateFile: string, variables: any, credentials: any,useCustomTemplate: any, customTemplate: any) {
	let template = null;
	if (!useCustomTemplate) {
		template = fs.readFileSync(__dirname+"/templates/"+templateFile,'utf-8');
	}else {
		template = customTemplate;
	}
	let compiled = handlebars.compile(template);
	let resultTemplate = compiled(variables);
	return await transporter.sendMail({
		from : credentials.from,
		to: credentials.to,
		html: resultTemplate,
		subject: credentials.subject
	})
}

export default transporter;

