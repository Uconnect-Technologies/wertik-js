"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const lodash_1 = require("lodash");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const customApi_1 = __importDefault(require("./customApi"));
const auth = __importStar(require("./../helpers/auth"));
function default_1(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { configuration, models, sendEmail, emailTemplates, cache, expressApp, database, multerInstance, mailerInstance, socketio, logger, } = options;
        let initializeContext = lodash_1.get(configuration, "context.initializeContext", function () {
            return __awaiter(this, void 0, void 0, function* () { });
        });
        const useCors = lodash_1.get(configuration, "restApi.useCors", true);
        const useBodyParser = lodash_1.get(configuration, "restApi.useBodyParser", true);
        const useMorgan = lodash_1.get(configuration, "restApi.useMorgan", true);
        initializeContext = yield initializeContext("restApi", {
            models,
            expressApp,
            database,
        });
        if (useCors) {
            expressApp.use(cors_1.default({
                credentials: true,
                methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE", "PATCH"],
            }));
        }
        if (useBodyParser) {
            expressApp.use(body_parser_1.default.urlencoded({ extended: false }));
            expressApp.use(body_parser_1.default.json());
        }
        if (useMorgan) {
            expressApp.use(morgan_1.default("combined"));
        }
        expressApp.use(function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                req.wertik = {
                    database: database,
                    auth: {
                        helpers: auth,
                    },
                    mailerInstance: mailerInstance,
                    models: models,
                    socketio: socketio,
                    cache: cache,
                    sendEmail: sendEmail,
                    emailTemplates: emailTemplates,
                    multerInstance: multerInstance,
                    logger: logger,
                    // requestContext: requestContext,
                    initializeContext: initializeContext,
                    configuration: configuration,
                };
                let requestContext = yield lodash_1.get(configuration.context, "requestContext", () => { })("restApi", req);
                req.wertik.requestContext = requestContext;
                next();
            });
        });
        require("./versions/v1/loadAllModules").default(expressApp, configuration, customApi_1.default);
        expressApp.get("/w/info", (req, res) => {
            res.status(200).json({
                message: "Welcome to wertik, You are successfully running Wertik.",
                version: require("./../../../package.json").version,
            });
        });
        return expressApp;
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map