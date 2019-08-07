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
let { get } = require("lodash");
const index_1 = __importDefault(require("./actions/index"));
const internalServerError_1 = __importDefault(require("./../../framework/helpers/internalServerError"));
const { create, update, destroy, findOne, view, paginate } = index_1.default;
class Model {
    constructor(props) {
        this.instance = null;
        this.tableName = props.tableName;
        this.models = props.models;
        this.model = this.models[this.tableName];
    }
    delete(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fakeResponse = {};
                yield destroy(this.model, args);
                return fakeResponse;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        });
    }
    create(args, requestedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fakeResponse = yield create(this.model, args, "", requestedFields);
                return fakeResponse;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        });
    }
    update(args, requestedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield update(this.model, args, requestedFields);
                return response;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        });
    }
    view(args, requestedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield view(this.model, args, requestedFields);
                if (!response) {
                    return null;
                }
                return response;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        });
    }
    findOne(args, requestedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield findOne(this.model, args, requestedFields);
                if (!response) {
                    return null;
                }
                return response;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        });
    }
    paginate(args, requestedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.model, this.tableName, this.models);
                let response = yield paginate(this.model, args, requestedFields);
                return response;
            }
            catch (e) {
                return internalServerError_1.default(e);
            }
        });
    }
    getInstance() {
        return get(this, "instance", null);
    }
    /*
      Create a random instance, If this model is under relationship for another instance please use it with promises to save relation data.
    */
    seed(initialData) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => { });
        });
    }
}
exports.default = Model;
//# sourceMappingURL=model.js.map