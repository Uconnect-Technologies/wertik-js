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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenHandler = exports.activateAccount = exports.loginWithAccessToken = exports.twoFactorLoginValidate = exports.twoFactorLogin = exports.login = exports.signup = void 0;
const moment_1 = __importDefault(require("moment"));
const createJwtToken_1 = __importDefault(require("./../../../../framework/security/createJwtToken"));
const apollo_server_1 = require("apollo-server");
const auth_1 = require("./../../../../framework/helpers/auth");
const lodash_1 = require("lodash");
exports.signup = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, data, emailTemplates, sendEmail, configuration } = obj;
        const { sendEmailOnSignup } = lodash_1.get(configuration, 'email.sendEmailOnSignup', true);
        let { email, password, confirmPassword } = data, restData = __rest(data, ["email", "password", "confirmPassword"]);
        if (password !== confirmPassword)
            throw new apollo_server_1.ApolloError("Passwords doesn't match.");
        let user = yield userModel.findOne({
            where: {
                email: email
            }
        });
        if (user)
            throw new apollo_server_1.ApolloError("Email is already used");
        var hash = auth_1.generateHashPassword(password);
        let newUser = yield userModel.create(Object.assign({ email: email, referer: lodash_1.get(data, "referer", ""), superUser: false, name: lodash_1.get(data, "name", ""), accessToken: yield createJwtToken_1.default({
                email: email,
                for: "authentication",
                expiresIn: moment_1.default()
                    .add(5, "days")
                    .unix()
            }), refreshToken: yield createJwtToken_1.default({
                email: email,
                for: "refreshToken",
                expiresIn: moment_1.default()
                    .add(5, "days")
                    .unix()
            }), isActivated: false, isSuperUser: lodash_1.get(data, "isSuperUser", false), activationToken: Math.random()
                .toString(36)
                .substring(2) +
                Math.random()
                    .toString(36)
                    .substring(2) +
                Math.random()
                    .toString(36)
                    .substring(2), password: hash }, restData));
        let userInstance = newUser;
        if (sendEmailOnSignup) {
            yield sendEmail(emailTemplates.welcome, {
                email: newUser.email,
                username: newUser.email,
                date: moment_1.default().format("dddd, MMMM Do YYYY, h:mm:ss a"),
                siteName: process.env.name,
                activationUrl: `${process.env.frontendAppUrl}/activate-account/`,
                activationToken: newUser.activationToken,
            }, {
                from: process.env.mailerServiceUsername,
                to: newUser.email,
                subject: `Welcome to ${process.env.name}`,
            });
        }
        return {
            message: "Signup Completed",
            returning: userInstance
        };
    });
};
exports.login = function (obj, NoUserFoundMessage = '"No User found with such email"') {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, data } = obj;
        const { email, password } = data;
        const restArgs = lodash_1.get(data, "restArgs", {});
        let user = yield userModel.findOne({
            where: Object.assign({ email: email }, restArgs),
        });
        if (!user) {
            throw new apollo_server_1.ApolloError(NoUserFoundMessage);
        }
        let comparePassword = yield auth_1.verifyPassword(password, user.password);
        if (!comparePassword) {
            throw new apollo_server_1.ApolloError("Incorrect Password");
        }
        let token = yield createJwtToken_1.default({
            email: email,
            for: "authentication",
            expiresIn: moment_1.default()
                .add(5, "days")
                .unix()
        });
        user = yield user.update({
            accessToken: token
        });
        return {
            message: "Login Completed",
            returning: user
        };
    });
};
exports.twoFactorLogin = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, emailTemplates, sendEmail, data } = obj;
        const { email } = data;
        let user = yield userModel.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new apollo_server_1.ApolloError("Incorrect email.");
        }
        const twoFactorCode = `Code-` + Math.floor(Math.random() * 60000 + 5000);
        user = yield user.update({
            twoFactorCode: twoFactorCode
        });
        let userInstance = user;
        yield sendEmail(emailTemplates.twoFactorLogin, {
            username: user.email,
            siteName: process.env.name,
            twoFactorCode: twoFactorCode
        }, {
            from: process.env.mailerServiceUsername,
            to: user.email,
            subject: `${twoFactorCode} is your authentication number - ${process.env.name}`
        });
        return {
            message: `A code has been sent to your email which is ${userInstance.email}`
        };
    });
};
exports.twoFactorLoginValidate = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, data } = obj;
        const { twoFactorCode } = data;
        let user = yield userModel.findOne({ where: {
                twoFactorCode: twoFactorCode
            } });
        if (!user) {
            throw new apollo_server_1.ApolloError("Incorrect twoFactorCode or already used.");
        }
        user = yield user.update({
            twoFactorCode: "",
            accessToken: yield createJwtToken_1.default({
                email: user.email,
                for: "authentication"
            }),
            refreshToken: yield createJwtToken_1.default({
                email: user.email,
                for: "authentication"
            })
        });
        return user;
    });
};
exports.loginWithAccessToken = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, data } = obj;
        const { accessToken } = data;
        let user = yield userModel.findOne({ where: {
                accessToken: accessToken
            } });
        if (!user) {
            throw new apollo_server_1.ApolloError("Access token is missing.");
        }
        user = yield user.update({
            accessToken: yield createJwtToken_1.default({
                email: user.email,
                for: "authentication"
            }),
            refreshToken: yield createJwtToken_1.default({
                email: user.email,
                for: "authentication"
            })
        });
        return user;
    });
};
exports.activateAccount = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, emailTemplates, sendEmail, data } = obj;
        const { activationToken } = data;
        let user = yield userModel.findOne({
            where: {
                activation_token: activationToken,
            },
        });
        if (!user) {
            throw new apollo_server_1.ApolloError("No User found or account is already is activated.");
        }
        user = yield user.update({
            is_activated: true,
            activation_token: ""
        });
        let userInstance = user;
        (yield sendEmail) &&
            sendEmail(emailTemplates.accountActivated, {
                username: user.email,
                siteName: process.env.name,
            }, {
                from: process.env.mailerServiceUsername,
                to: user.email,
                subject: `Account activated ${process.env.name}`,
            });
        return {
            message: "Account activated",
        };
    });
};
exports.refreshTokenHandler = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userModel, data } = obj;
        const { refreshToken } = data;
        let user = yield userModel.findOne({
            where: {
                refreshToken: refreshToken,
            },
        });
        if (!user) {
            throw new apollo_server_1.ApolloError("Unauthorized, Missing refresh token.");
        }
        user = yield user.update({
            accessToken: yield createJwtToken_1.default({
                email: user.email,
                for: "authentication"
            }),
            refreshToken: yield createJwtToken_1.default({
                email: user.email,
                for: "authentication"
            })
        });
        return user;
    });
};
//# sourceMappingURL=index.js.map