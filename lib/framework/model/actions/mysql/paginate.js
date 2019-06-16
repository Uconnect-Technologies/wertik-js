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
const convertFiltersIntoSequalizeObject_1 = __importDefault(require("./../../../database/mysql/convertFiltersIntoSequalizeObject"));
function default_1(model, args = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let pagination = get(args, 'pagination', { page: 1, limit: 10 });
        const { page, limit } = pagination;
        let filters = get(args, 'filters', []);
        let convertedFilters = yield convertFiltersIntoSequalizeObject_1.default(filters);
        let data = yield model.findAndCountAll();
        let pages = Math.ceil(data.count / limit);
        let offset = limit * (page - 1);
        let totalFilters = filters.length;
        let find = [];
        if (totalFilters === 0) {
            find = yield model.findAll({
                offset: offset,
                limit: limit,
            });
        }
        else {
            find = yield model.findAll({
                offset: offset,
                limit: limit,
                where: convertedFilters
            });
        }
        return {
            filters: filters,
            pagination,
            list: find
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=paginate.js.map