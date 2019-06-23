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
let { ApolloError } = require("apollo-server");
const { PubSub } = require('apollo-server');
const { camelCase } = require('lodash');
const validate_1 = __importDefault(require("./../validations/validate"));
const internalServerError_1 = __importDefault(require("./../helpers/internalServerError"));
const statusCodes_1 = __importDefault(require("./../helpers/statusCodes"));
const pubsub = new PubSub();
function default_1(info) {
    let { moduleName, validations, model } = info;
    const moduleCrated = `${camelCase(moduleName)}`;
    const moduleUpdated = `${camelCase(moduleName)}`;
    const moduleDeleted = `${camelCase(moduleName)}`;
    const moduleBulkCreated = `${camelCase(moduleName)}`;
    const moduleBulkDeleted = `${camelCase(moduleName)}`;
    const moduleBulkUpdated = `${camelCase(moduleName)}`;
    return {
        subscriptions: {
            [`${camelCase(moduleName)}Created`]: {
                subscribe: () => pubsub.asyncIterator([`${camelCase(moduleName)}Created`])
            },
            [`${camelCase(moduleName)}Updated`]: {
                subscribe: () => pubsub.asyncIterator([`${camelCase(moduleName)}Updated`])
            },
            [`${camelCase(moduleName)}Deleted`]: {
                subscribe: () => pubsub.asyncIterator([`${camelCase(moduleName)}Deleted`])
            }
        },
        queries: {
            [`list${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield model.paginate(args);
                }
                catch (e) {
                    return internalServerError_1.default(e);
                }
            }),
            [`view${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                let v = yield validate_1.default(validations.view, args.input);
                let { success } = v;
                if (!success) {
                    throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                }
                try {
                    let view = yield model.view(args.input);
                    if (!view) {
                        throw new ApolloError(`${moduleName} not found`, statusCodes_1.default.NOT_FOUND.number);
                    }
                    return view;
                }
                catch (e) {
                    return internalServerError_1.default(e);
                }
            })
        },
        mutations: {
            [`updateBulk${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                return args.input.map((e) => __awaiter(this, void 0, void 0, function* () {
                    let v = yield validate_1.default(validations.update, e);
                    let { success } = v;
                    if (!success) {
                        throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                    }
                    try {
                        return yield model.update(e);
                    }
                    catch (e) {
                        return internalServerError_1.default(e);
                    }
                }));
            }),
            [`deleteBulk${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                return args.input.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let v = yield validate_1.default(validations.delete, item);
                    let { success } = v;
                    if (!success) {
                        throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                    }
                    try {
                        return yield model.delete(item);
                    }
                    catch (e) {
                        return internalServerError_1.default(e);
                    }
                }));
            }),
            [`createBulk${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                return args.input.map((e) => __awaiter(this, void 0, void 0, function* () {
                    let v = yield validate_1.default(validations.create, e);
                    let { success } = v;
                    if (!success) {
                        throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                    }
                    try {
                        return yield model.create(e);
                    }
                    catch (e) {
                        return internalServerError_1.default(e);
                    }
                }));
            }),
            [`create${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                let v = yield validate_1.default(validations.create, args.input);
                let { success } = v;
                if (!success) {
                    throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                }
                try {
                    let createModel = yield model.create(args.input);
                    pubsub.publish(`${camelCase(moduleName)}Created`, { [`${camelCase(moduleName)}Created`]: createModel });
                    return createModel;
                }
                catch (e) {
                    return internalServerError_1.default(e);
                }
            }),
            [`update${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                let v = yield validate_1.default(validations.update, args.input);
                let { success } = v;
                if (!success) {
                    throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                }
                try {
                    let updateModel = yield model.update(args.input);
                    pubsub.publish(`${camelCase(moduleName)}Updated`, { [`${camelCase(moduleName)}Updated`]: updateModel });
                    return updateModel;
                }
                catch (e) {
                    return internalServerError_1.default(e);
                }
            }),
            [`delete${moduleName}`]: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                let v = yield validate_1.default(validations.delete, args.input);
                let { success } = v;
                if (!success) {
                    throw new ApolloError("Validation error", statusCodes_1.default.BAD_REQUEST.number, { list: v.errors });
                }
                try {
                    yield model.delete(args.input);
                    pubsub.publish(`${camelCase(moduleName)}Deleted`, { [`${camelCase(moduleName)}Deleted`]: args.input });
                    return;
                }
                catch (e) {
                    return internalServerError_1.default(e);
                }
            })
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=resolvers.js.map