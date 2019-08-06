"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let bcrypt = require("bcrypt-nodejs");
let moment = require("moment");
let { get } = require("lodash");
let { ApolloError } = require("apollo-server");
const internalServerError_1 = __importDefault(require("./../../../framework/helpers/internalServerError"));
const validations_1 = __importDefault(require("./validations"));
const createJwtToken_1 = __importDefault(require("./../../../framework/security/createJwtToken"));
const isTokenExpired_1 = __importDefault(require("./../../../framework/security/isTokenExpired"));
const validate_1 = __importDefault(require("./../../../framework/validations/validate"));
const statusCodes_1 = __importDefault(require("./../../../framework/helpers/statusCodes"));
const index_1 = require("./../../../framework/mailer/index");
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
let { userModel, profileModel } = allModels_1.default;
exports.default = {
    queries: {},
    mutations: {
        loginWithAccessToken: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.loginWithAccessToken, args.input);
            if (!v.success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.findOne({ accessToken: args.input.accessToken });
                if (!user) {
                    return new ApolloError("Incorrect Access Token", statusCodes_1.default.NOT_FOUND.number);
                }
                if (isTokenExpired_1.default(user.accessToken)) {
                    yield user.update({
                        accessToken: yield createJwtToken_1.default({ email: user.email, for: "authentication" })
                    });
                }
                return user;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        twoFactorLogin: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.twoFactorLogin, args.input);
            let { success } = v;
            if (!success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.findOne({ email: args.input.email });
                if (!user) {
                    return new ApolloError("User Not found", statusCodes_1.default.NOT_FOUND.number);
                }
                let twoFactorCode = Math.floor(Math.random() * 100000);
                yield user.update({
                    twoFactorCode: twoFactorCode
                });
                yield index_1.sendEmail('twoFactorLogin.hbs', {
                    twoFactorCode: twoFactorCode,
                    siteName: process.env.name,
                    userName: user.email
                }, {
                    from: process.env.mailerServiceUsername,
                    to: get(args, 'input.email', ''),
                    subject: `${process.env.name} Two Factor Authorization`
                });
                return {
                    successMessageType: "Success",
                    successMessage: "Email Sent"
                };
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        twoFactorLoginValidate: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.twoFactorLoginValidate, args.input);
            let { success } = v;
            if (!success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.findOne({ twoFactorCode: args.input.twoFactorCode });
                if (!user) {
                    return new ApolloError("User Not found", statusCodes_1.default.NOT_FOUND.number);
                }
                let token = yield createJwtToken_1.default({ email: user.email, for: "authentication" });
                yield user.update({
                    accessToken: token,
                    twoFactorCode: ""
                });
                user.accessToken = token;
                user.successMessage = "Success";
                user.successMessageType = "You are successfully logged in";
                user.statusCode = statusCodes_1.default.OK.type;
                user.statusCodeNumber = statusCodes_1.default.OK.number;
                return user;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        activateAccount: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.activateAccount, args.input);
            let { success } = v;
            if (!success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.findOne({ activationToken: args.input.activationToken });
                if (!user) {
                    return new ApolloError("Not found", statusCodes_1.default.NOT_FOUND.number);
                }
                yield user.update({
                    activationToken: "",
                    isActivated: true,
                    activatedOn: moment().valueOf()
                });
                yield index_1.sendEmail('accountActivated.hbs', {
                    username: user.email,
                    siteName: process.env.name,
                }, {
                    from: process.env.mailerServiceUsername,
                    to: user.email,
                    subject: `Welcome to ${process.env.name}`
                });
                return {
                    statusCode: statusCodes_1.default.OK.type,
                    statusCodeNumber: statusCodes_1.default.OK.number,
                    successMessage: "Success",
                    successMessageType: "Account successfully isActivated"
                };
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        login: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.login, args.input);
            let { success } = v;
            if (!success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let { email, password } = args.input;
                let user = yield userModel.findOne({ email: email });
                let findEmail = get(user, 'email', null);
                if (!user) {
                    return new ApolloError("No User found with such email", statusCodes_1.default.NOT_FOUND.number);
                }
                let comparePassword = bcrypt.compareSync(password, user.password);
                if (!comparePassword) {
                    return new ApolloError("Incorrect Password", statusCodes_1.default.BAD_REQUEST.number);
                }
                let token = yield createJwtToken_1.default({ email: email, for: "authentication" });
                yield user.update({
                    accessToken: token
                });
                user.accessToken = token;
                user.successMessage = "Success";
                user.successMessageType = "You are successfully logged in";
                user.statusCode = statusCodes_1.default.OK.type;
                user.statusCodeNumber = statusCodes_1.default.OK.number;
                return user;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        signup: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.signup, args.input);
            if (!v.success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let { email, password, confirmPassword } = args.input;
                let user = yield userModel.findOne({
                    email: email
                });
                if (user)
                    return new ApolloError("Email is already used", statusCodes_1.default.BAD_REQUEST.number);
                var hash = bcrypt.hashSync(password);
                let newUser = yield userModel.create({
                    email: email,
                    referer: get(args.input, 'referer', ''),
                    superUser: false,
                    name: get(args.input, 'name', ''),
                    accessToken: yield createJwtToken_1.default({ email: email, for: "authentication" }),
                    refreshToken: yield createJwtToken_1.default({ email: email, for: "refreshToken" }),
                    isActivated: false,
                    isSuperUser: get(args.input, 'isSuperUser', false),
                    activationToken: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
                    password: hash
                });
                yield index_1.sendEmail('welcome.hbs', {
                    email: newUser.email,
                    username: newUser.email,
                    date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    siteName: process.env.name,
                    activationUrl: `${process.env.frontendAppUrl}/activate-account/`,
                    activationToken: newUser.activationToken,
                }, {
                    from: process.env.mailerServiceUsername,
                    to: newUser.email,
                    subject: `Welcome to ${process.env.name}`
                });
                yield profileModel.create({
                    description: '...',
                    user: newUser[primaryKey_1.default],
                });
                newUser.statusCode = statusCodes_1.default.OK.type;
                newUser.statusCodeNumber = statusCodes_1.default.OK.number;
                newUser.successMessageType = "Registered";
                newUser.successMessage = "New user successfully created";
                return newUser;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        refreshToken: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.refreshToken, args.input);
            if (!v.success) {
                return new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.findOne({
                    refreshToken: get(args, 'input.refreshToken', '')
                });
                if (!user) {
                    return new ApolloError("Refresh Token is Incorrect, please login again.", statusCodes_1.default.BAD_REQUEST.number);
                }
                let token = yield createJwtToken_1.default({ email: user.email, for: "authentication" });
                yield user.update({
                    accessToken: token
                });
                user.statusCode = statusCodes_1.default.OK.type;
                user.statusCodeNumber = statusCodes_1.default.OK.number;
                user.successMessageType = "Success";
                user.successMessage = "Access token refreshed";
                return user;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
    }
};
//# sourceMappingURL=resolvers.js.map