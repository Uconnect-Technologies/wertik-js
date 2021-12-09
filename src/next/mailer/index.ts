import nodemailer from "nodemailer"
import handlebars from "handlebars"
import { iObject, WertikApp } from "../types"
import { emailSendProps } from "../types/mailer"

export const useMailer = (props?: iObject) => {
  return async () => {
    let testAccount = props ? null : await nodemailer.createTestAccount()

    const wertiknodemailerDefaultConfiguration = props
      ? props
      : {
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount?.user,
            pass: testAccount?.pass,
          },
        }

    return nodemailer.createTransport(wertiknodemailerDefaultConfiguration)
  }
}

export const emailSender = (app: WertikApp) => {
  const fn = (props: { mailer: string; options: emailSendProps }) => {
    return async () => {
      let transporter = app.mailer[props.mailer]

      if (!transporter) {
        throw new Error(
          `Email integration ${props.mailer} not found. Please check the typo.`
        )
      }

      let compiled = handlebars.compile(props.options.template)
      let resultTemplate = compiled(props.options.variables)
      let emailInstance = await transporter.sendMail({
        from: props.options.from,
        to: props.options.to,
        html: resultTemplate,
        subject: props.options.subject,
      })
      if (emailInstance && emailInstance.messageId) {
        console.log("Message sent: %s", emailInstance.messageId)
      }
      if (nodemailer && nodemailer.getTestMessageUrl) {
        console.log(
          "Preview URL: %s",
          nodemailer.getTestMessageUrl(emailInstance)
        )
      }
      return emailInstance
    }
  }
  return fn
}
