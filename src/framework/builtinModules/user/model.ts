import Model from "./../../model/model";
class User extends Model {
    constructor() {
        super();
        this.tableName = "user";
        this.fields = {
            _id: "String",
            id: "Int",
            name: "String",
            username: "String",
            refreshToken: "String",
            accessToken: "String",
            isActivated: "Boolean",
            activatedOn: "String",
            twoFactorCode: "String",
            isSuperUser: "Boolean",
            activationToken: "String",
            email: "String",
            password: "String",
            referer: "String"
        },
    }
}