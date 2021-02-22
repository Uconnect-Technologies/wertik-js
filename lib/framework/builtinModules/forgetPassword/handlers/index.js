"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const index_1 = require("./../../../helpers/index");
const moment_1 = __importDefault(require("moment"));
const auth_1 = require("../../../helpers/auth");
exports.requestPasswordResetHandler = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, forgetPasswordModel, data, emailTemplates, sendEmail } = obj;
        let user = yield userModel.findOne({
            where: {
                email: data.email
            }
        });
        if (!user.instance)
            throw new apollo_server_1.ApolloError("No User found with such email.");
        let forgetPassword = yield forgetPasswordModel.findOne({
            where: {
                email: data.email,
            },
        });
        if (forgetPassword.instance) {
            yield forgetPassword.delete();
        }
        let token = index_1.randomString(24, "MYNAMEISILYASKARIMANDIVETHESENUMBERS123456789");
        yield forgetPasswordModel.create({
            token: token,
            email: user.instance.email,
            user: user.instance.id,
            expiresIn: moment_1.default()
                .add(30, "m")
                .unix()
        });
        yield sendEmail(emailTemplates.requestPasswordReset, {
            email: user.instance.email,
            nextMinutes: moment_1.default()
                .add(30, "m")
                .format("LLLL"),
            token: token,
            siteName: process.env.name,
            frontendAppPasswordResetUrl: process.env.frontendAppPasswordResetUrl
        }, {
            from: process.env.mailerServiceUsername,
            to: user.instance.email,
            subject: `Reset Password`
        });
        return {
            message: "Please check your email"
        };
    });
};
exports.resetPasswordHandler = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, forgetPasswordModel, data } = obj;
        const { token, password, confirmPassword } = data;
        let forgetPassword = yield forgetPasswordModel.findOne({
            where: {
                token: token,
            },
        });
        if (!forgetPassword.instance)
            throw new apollo_server_1.ApolloError("Token mismatch or already used.");
        let user = yield userModel.findOne({
            where: {
                email: forgetPassword.instance.email,
            },
        });
        if (!user.instance)
            throw new apollo_server_1.ApolloError("User not found");
        const hash = auth_1.generateHashPassword(password);
        yield user.update({
            password: hash
        });
        yield forgetPassword.delete();
        return {
            message: "Password changed"
        };
    });
};
//# sourceMappingURL=index.js.map