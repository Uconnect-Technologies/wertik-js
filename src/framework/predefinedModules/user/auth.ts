let {get} = require("lodash");
let {ApolloError} = require("apollo-server");

import {models} from "./../../../framework/database/connection";
import Model from "./../../../framework/model/model";
import isAuthQuery from "./../../../framework/security/isAuthQuery";
import isTokenExpired from "./../../../framework/security/isTokenExpired";
import statusCodes from "./../../../framework/helpers/statusCodes";

let userModel = new Model({
	models: models,
	tableName: "user"
});