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
const convertFiltersArrayInToMongoFilter_1 = __importDefault(require("./../../../database/mongodb/convertFiltersArrayInToMongoFilter"));
function default_1(model, args = {}, requestedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        let filters = get(args, 'filters', []);
        let baseFields = Object.keys(requestedFields.list);
        let mongodbFilter = yield convertFiltersArrayInToMongoFilter_1.default(filters);
        let pagination = get(args, 'pagination', { page: 1, limit: 10 });
        const { page, limit } = pagination;
        let totalFilters = filters.length;
        let result = {};
        console.log(model);
        if (totalFilters > 0) {
            result = yield model.paginate(mongodbFilter, {
                page: page,
                limit: limit,
                select: baseFields.join(" ")
            });
        }
        else {
            result = yield model.paginate({}, {
                page: page,
                limit: limit,
                select: baseFields.join(" ")
            });
        }
        const response = get(result, 'docs', []);
        console.log(response);
        return {
            filters: filters,
            pagination: pagination,
            list: response
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=paginate.js.map