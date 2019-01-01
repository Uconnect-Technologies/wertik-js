import Model from "./../../../framework/model/model.js";
import {sendEmail} from "./../../../framework/mailer/index.js";

class User extends Model {
  constructor() {
    super({
      tableName: "user"
    })
  }
  login() {

  }
  signup() {

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