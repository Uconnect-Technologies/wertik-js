### Email - Beta

Wertik-js also provides email system that allows you to send emails from your own applications. Under the hood, Wertik-js uses nodemailer for sending emails. Please see here how node mailer is initialized https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts.

Wertik-js js allows you to send define your own custom Mailer instance and Email send method. You can check this function that provides mailer instance https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts#L52. You have two ways, You can send mailer instance through `configuration.email.defaultMailerInstance` or to extend node mailer you can configuration object for node mailer at `configuration.email.configuration`, The default value for `configuration.email.configuration` is:

```javascript
const wertiknodemailerDefaultConfiguration = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
};
```

**Send Email**

Wertik-js uses this method to send email by using mailer instance returned from https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts#L52. You can define your own custom send email method at `configuration.email.sendEmail`. For more please see https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/main.ts#L33.
