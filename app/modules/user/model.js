import {get} from "lodash";
import simplecrypt from "simplecrypt";
import moment from "moment";

import Model from "@framework/model/model.js";
import {sendEmail} from "@framework/mailer/index.js";
import createJwtToken from "@framework/security/createJwtToken.js";
import {encrypt,decrypt} from "@framework/security/password.js";

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
        if (user && decrypt(user.password) == password ) {
          let accessToken = await createJwtToken({email: email,for: "authentication"});
          await user.updateAttributes({
            accessToken: accessToken
          })
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
        accessToken: await createJwtToken({email: email,for: "authentication"}),
        refreshToken: await createJwtToken({email: email,for: "refreshToken"}),
        isActivated: false,
        activationToken: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
        password: encrypt(password)
      });
      sendEmail('welcome.hbs',{
          userName: email,
          siteName: process.env.NAME,
          date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
          activationToken: get(newUser,'activationToken',''),
          activationUrl: process.env.FRONTEND_DEVELOPMENT_URL 
        },{
          from: 'ilyas.datoo@gmail.com',
          to: email,
          subject: `Welcome to ${process.env.NAME}`,
        });
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
  async activateAccount(_,args) {
    try {
      let {activationToken} = args;
      let user = await this.model.findOne({
        where: { activationToken: activationToken }
      });
      if (!user) {
        return {
          statusCode: "BAD_REQUEST",
          errorMessageType: "User not found",
          errorMessage: "User is not found please try again"
        }
      }
      user.updateAttributes({
        isActivated: true,
        activationToken: ''
      });
      user.successMessageType = "Account activated";
      user.successMessage = "Account successfuly activated";

      sendEmail('accountActivated.hbs',{
        userName: user.email,
        siteName: process.env.NAME,
      },{
        from: 'ilyas.datoo@gmail.com',
        to: user.email,
        subject: `Account activated for ${process.env.NAME}`,
      });
      user.statusCode = "CREATED"
      return user;
    } catch (e) {
      return {
        errorMessageType: "Error from our side",
        errorMessage: e.message,
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    }
  }
  async user(_,args) {
    try {
      let {id} = args;
      if (!id) {
        return {
          errorMessageType: 'ID is required',
          errorMessage: `ID is required to find user`,
          statusCode: 'BAD_REQUEST'
        }
      }
      let user = await this.model.findByPk(args.id);
      if (!user) {
        return {
          errorMessageType: 'User not found',
          errorMessage: `User not found, please try again`,
          statusCode: 'BAD_REQUEST'
        }
      }
      user.successMessage = "User fetched successfuly";
      user.successMessageType = "User fetched";
      user.statusCode = 'OK';
      return user;
    } catch (e) {
      return {
        errorMessageType: 'Backend Error',
        errorMessage: `Something went wrong, ${e.message}`,
        statusCode: 'INTERNAL_SERVER_ERROR'
      }
    } 
  }
  async changePassword(_,args) {
      try {
        let {id, oldPassword, newPassword} = args;
        if (!id || !oldPassword || !newPassword) {
          return {
            errorMessageType: "Fields Required",
            errorMessage: `You must provide id, old password and new password`,
            statusCode: 'BAD_REQUEST'
          }
        }
        let user = await this.model.findById(id);
        if (user) {
          let {email} = user;
          if (decrypt(user.password) == oldPassword ) {
            await user.updateAttributes({
              password: encrypt(newPassword)
            });
            sendEmail('changePassword.hbs',{
              email: email,
              siteName: process.env.NAME,
              userName: email,
            },{
              from: 'ilyas.datoo@gmail.com',
              to: email,
              subject: `Password changed for ${process.env.NAME}`,
            });
            return { 
              successMessageType: "Password Changed", 
              successMessage: `Password successfully changed for ${user.email}`,
              statusCode: 'CREATED',
            };
          }else {
            return { 
              errorMessageType: "Incorrect Password", 
              errorMessage: "You have entered incorrect Password",
              statusCode: 'CREATED'
            };
          }
        }else {
          return {
            errorMessageType: "No User found.",
            errorMessage: "No user found please try again",
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
  async updateProfile(_, args) {
    try {
      let {id} = args;
      let user = await this.model.findById(id);
      if (user) {
        let attributes = {...args};
        delete attributes['id'];
        let response = await user.updateAttributes(attributes);
        response.successMessageType = "Profile updated";
        response.successMessage = "Profile updated successfully";
        response.statusCode = "CREATED";
        return response;
      }else {
        return {
          errorMessageType: "No User found",
          errorMessage: "No user found please try again.",
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
  async refreshToken(_,args) {
      try {
        let {id,refreshToken} = args;
        let user = await this.model.findOne({
          where: {id: id}
        });
        if (!user) {
          return {
            errorMessageType: "No user found",
            errorMessage: "No user found with that token",
            statusCode: 'BAD_REQUEST'
          }
        }
        let token = await createJwtToken({email: user.email,for: "authentication"});
        await user.updateAttributes({
          accessToken: token,
        });
        user.statusCode = 'CREATED';
        user.successMessageType = "Token refreshed";
        user.successMessage = "Token Refreshed successfuly";
        return user;
      } catch (e) {
        return {
          errorMessageType: 'Backend Error',
          errorMessage: `Something went wrong, ${e.message}`,
          statusCode: 'INTERNAL_SERVER_ERROR'
        }
      }
  }
}

export default new User();