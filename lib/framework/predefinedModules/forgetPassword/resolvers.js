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
let moment = require("moment");
let bcrypt = require("bcrypt-nodejs");
let { ApolloError } = require("apollo-server");
const internalServerError_1 = __importDefault(require("./../../../framework/helpers/internalServerError"));
const validations_1 = __importDefault(require("./validations"));
const validate_1 = __importDefault(require("./../../../framework/validations/validate"));
const statusCodes_1 = __importDefault(require("./../../../framework/helpers/statusCodes"));
const index_1 = require("./../../../framework/mailer/index");
const allModels_1 = __importDefault(require("./../../../framework/dynamic/allModels"));
let { forgetPasswordModel, userModel } = allModels_1.default;
exports.default = {
    queries: {
        forgetPasswordView: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.forgetPassword, args);
            let { success } = v;
            if (!success) {
                throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let forgetPassword = yield forgetPasswordModel.findOne({ token: args.token });
                if (!forgetPassword) {
                    throw new ApolloError("Token expired or not found.", statusCodes_1.default.NOT_FOUND.number);
                }
                forgetPassword.successMessageType = "Successfull";
                forgetPassword.successMessage = "Forget password item";
                forgetPassword.statusCode = statusCodes_1.default.OK.type;
                forgetPassword.statusCodeNumber = statusCodes_1.default.OK.number;
                return forgetPassword;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        })
    },
    mutations: {
        requestPasswordReset: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.requestPasswordReset, args);
            let { success } = v;
            if (!success) {
                throw new ApolloError("Validation Errors", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let user = yield userModel.findOne({ email: args.email });
                if (!user) {
                    throw new ApolloError("User not found", statusCodes_1.default.NOT_FOUND.number);
                }
                let token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                yield forgetPasswordModel.create({
                    token: token,
                    email: args.email,
                    expireDate: `${moment().add('30', 'minutes').valueOf()}`
                });
                yield index_1.sendEmail('requestPasswordResetToken.hbs', {
                    email: args.email,
                    returnUrl: process.env.frontendAppUrl,
                    token: token,
                    frontendAppPasswordResetUrl: process.env.frontendAppPasswordResetUrl,
                    nextMinutes: moment().add('30', 'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    siteName: process.env.name
                }, {
                    from: process.env.mailerServiceUsername,
                    to: args.email,
                    subject: "Reset your email"
                });
                return {
                    email: args.email,
                    successMessageType: "Successfull",
                    successMessage: "Please check your email. We have sent a link to reset your email",
                    statusCode: statusCodes_1.default.CREATED.type
                };
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
        resetPassword: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
            let v = yield validate_1.default(validations_1.default.resetPassword, args);
            let { success } = v;
            if (!success) {
                throw new ApolloError("Validation Errors", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
            }
            try {
                let forgetPassword = yield forgetPasswordModel.findOne({ token: args.token });
                if (!forgetPassword) {
                    throw new ApolloError("Token Expired", statusCodes_1.default.NOT_FOUND.number);
                }
                let user = yield userModel.findOne({ email: forgetPassword.email });
                if (!forgetPassword) {
                    throw new ApolloError("User not foundd", statusCodes_1.default.NOT_FOUND.number);
                }
                let hash = bcrypt.hashSync(args.password);
                yield user.update({
                    password: hash
                });
                yield forgetPasswordModel.delete(forgetPassword);
                yield index_1.sendEmail('changePassword.hbs', {
                    userName: user.email,
                    siteName: process.env.name,
                    email: user.email,
                }, {
                    from: process.env.mailerServiceUsername,
                    to: user.email,
                    subject: "Password changed"
                });
                return {
                    successMessageType: "Success",
                    successMessage: "Password successfully changed",
                    statusCode: statusCodes_1.default.OK.type,
                    statusCodeNumber: statusCodes_1.default.OK.number
                };
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        }),
    },
};
//# sourceMappingURL=resolvers.js.map