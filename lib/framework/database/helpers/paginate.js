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
const lodash_1 = require("lodash");
const convertFiltersIntoSequalizeObject_1 = __importDefault(require("./convertFiltersIntoSequalizeObject"));
const index_1 = require("../../helpers/index");
function default_1(model) {
    return __awaiter(this, void 0, void 0, function* () {
        return function (args, requestedFields = []) {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!Array.isArray(requestedFields)) {
                        throw new Error("Requested fields must be an array");
                    }
                    let page = lodash_1.get(args, "pagination.page", 1);
                    let limit = lodash_1.get(args, "pagination.limit", 500);
                    let filters = lodash_1.get(args, "filters", {});
                    let sorting = lodash_1.get(args, "sorting", []);
                    let offset = limit * (page - 1);
                    let convertedFilters = yield convertFiltersIntoSequalizeObject_1.default(filters);
                    requestedFields = index_1.removeColumnsFromAccordingToSelectIgnoreFields(requestedFields, model.selectIgnoreFields);
                    let mainObject = {
                        order: sorting.map((c) => {
                            return [c.column, c.type];
                        }),
                        attributes: requestedFields,
                    };
                    if (mainObject.attributes.length === 0) {
                        delete mainObject["attributes"];
                    }
                    if (mainObject.order.length == 0) {
                        delete mainObject["order"];
                    }
                    const list = yield model.findAndCountAll(Object.assign({ offset: offset, limit: limit, where: convertedFilters }, mainObject));
                    const totalPages = Math.ceil(list.count / limit);
                    resolve({
                        filters,
                        pagination: { page, limit },
                        list: list.rows,
                        paginationProperties: {
                            total: list.count,
                            nextPage: page + 1,
                            page: page,
                            previousPage: page == 1 ? 1 : page - 1,
                            pages: totalPages,
                            hasMore: page < totalPages
                        },
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=paginate.js.map