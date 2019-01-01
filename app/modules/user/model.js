import Model from "./../../../framework/model/model.js";
import {sendEmail} from "./../../../framework/mailer/index.js";
import simplecrypt from "simplecrypt";
import {get} from "lodash";
let crypto = simplecrypt();

class User extends Model {
  constructor() {
    super({
      tableName: "user"
    })
  }
  async login(_,args) {
    try {
      let { email, password } = args;
      if (email && password) {
        let user = await this.model.findOne({
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
        if (user && crypto.decrypt(user.password) == password ) {
          global.appEvents.onUserLogin();
          user.token = await createJwtToken(user).token;
          return user
        }else {
          return {
            errorMessageType: "Incorrect Password And/Or Email", 
            errorMessage: "You have entered incorrect Password And/Or Email",
            statusCode: 'BAD_REQUEST'
          }
        }
      }else {
        return {
          errorMessageType: "Missing details",
          errorMessage: "Please enter your Email & Password",
          statusCode: 'BAD_REQUEST'
        }
      }
    } catch (e) {
      return {
        errorMessageType: "Error from our side",
        errorMessage: e.message,
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    }	
  }
  async signup(_, args) {
    try {
      let { email, password, confirm_password } = args;
      let user = await this.model.findOne({
        where: { email: email }
      });
      if (user) {
        return {
          errorMessageType: "Already Registered",
          errorMessage: `${email} is already is Registered`,
          statusCode: 'BAD_REQUEST'
        }
      }
      let newUser = await this.model.create({
        email: email,
        isActivated: false,
        activationToken: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
        password: crypto.encrypt(password)
      });
      // sendEmail('welcome.hbs',{
      //     userName: email,
      //     siteName: process.env.APP_NAME,
      //     date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      //     activationToken: get(newUser,'activationToken',''),
      //     activationUrl: activationUrl 
      //   },{
      //     from: 'ilyas.datoo@gmail.com',
      //     to: email,
      //     subject: `Welcome to ${process.env.APP_NAME}`,
      //   });
      // newUser.token = await createJwtToken(newUser).token;
      newUser.token = "asdasdasd";
      newUser.statusCode = 'CREATED';
      newUser.successMessage = "Account successfuly created";
      newUser.successMessageType = "Account Created";
      delete newUser['password'];
      return newUser;
    } catch (e) {
      return {
        errorMessageType: "Error from our side",
        errorMessage: e.message,
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    }
  }
  activateAccount() {

  }
  view() {

  }
  changePassword() {

  }
  updateProfile() {
    
  }
}

export default new User();