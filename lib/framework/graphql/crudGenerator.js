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
const getRequestedFieldsFromResolverInfo_1 = __importDefault(require("./../helpers/getRequestedFieldsFromResolverInfo"));
const lodash_1 = require("lodash");
const index_1 = require("../helpers/index");
const convertFiltersIntoSequalizeObject_1 = __importDefault(require("../database/helpers/convertFiltersIntoSequalizeObject"));
const identityColumn = "id";
const identityColumnGraphQLType = "Int";
exports.generateQueriesCrudSchema = (moduleName) => {
    let string = "";
    const byFilter = `${index_1.firstLetterLowerCase(moduleName)}(filters: [FilterInput]): ${moduleName}`;
    const viewString = `view${moduleName}(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
    const listString = `list${moduleName}(cache: CacheOptionsInput, pagination: PaginationInput, filters: ${moduleName}FilterInput, sorting: [SortingInput]): ${moduleName}List`;
    const countString = `count${moduleName}(filters: ${moduleName}FilterInput):  Int`;
    string = `
    ${viewString}
    ${listString}
    ${countString}
  `;
    string = string + " " + " " + byFilter;
    return string;
};
exports.generateMutationsCrudSubscriptionSchema = (moduleName) => {
    return `
    ${moduleName}Deleted: SuccessResponse
    ${moduleName}BulkCreated: [${moduleName}]
    ${moduleName}BulkUpdated: [${moduleName}]
  `;
};
exports.getSubscriptionConstants = (moduleName) => {
    return {
        deletedModule: `${moduleName}Deleted`,
        bulkCreatedModule: `${moduleName}BulkCreated`,
        bulkUpdatedModule: `${moduleName}BulkUpdated`,
    };
};
exports.generateSubscriptionsCrudResolvers = (moduleName, pubsub) => {
    const { deletedModule, bulkCreatedModule, bulkUpdatedModule } = exports.getSubscriptionConstants(moduleName);
    let object = {
        [deletedModule]: {
            subscribe: () => pubsub.asyncIterator([deletedModule]),
        },
        [bulkCreatedModule]: {
            subscribe: () => pubsub.asyncIterator([bulkCreatedModule]),
        },
        [bulkUpdatedModule]: {
            subscribe: () => pubsub.asyncIterator([bulkUpdatedModule]),
        },
    };
    return object;
};
exports.generateMutationsCrudSchema = (moduleName) => {
    const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
    const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
    const bulkDeleteString = `bulkDelete${moduleName}(input: IDDeleteInput): SuccessResponse`;
    return `
    ${bulkUpdateString}
    ${bulkCreateString}
    ${bulkDeleteString}
  `;
};
exports.generateCrudResolvers = (module, pubsub, configuration) => {
    const overrideMutationBulkCreate = lodash_1.get(configuration, `override.${module.name}.graphql.mutation.bulkCreate`, null);
    const overrideMutationBulkUpdate = lodash_1.get(configuration, `override.${module.name}.graphql.mutation.bulkUpdate`, null);
    const overrideMutationBulkDelete = lodash_1.get(configuration, `override.${module.name}.graphql.mutation.bulkDelete`, null);
    const overrideQueryList = lodash_1.get(configuration, `override.${module.name}.graphql.query.list`, null);
    const overrideQueryView = lodash_1.get(configuration, `override.${module.name}.graphql.query.view`, null);
    const beforeBulkDelete = lodash_1.get(configuration, `events.database.${module.name}.beforeBulkDelete`, null);
    const afterBulkDelete = lodash_1.get(configuration, `events.database.${module.name}.afterBulkDelete`, null);
    const beforeBulkCreate = lodash_1.get(configuration, `events.database.${module.name}.beforeBulkCreate`, null);
    const afterBulkCreate = lodash_1.get(configuration, `events.database.${module.name}.afterBulkCreate`, null);
    const beforeBulkUpdate = lodash_1.get(configuration, `events.database.${module.name}.beforeBulkUpdate`, null);
    const afterBulkUpdate = lodash_1.get(configuration, `events.database.${module.name}.afterBulkUpdate`, null);
    // R
    const beforeList = lodash_1.get(configuration, `events.database.${module.name}.beforeList`, null);
    const afterList = lodash_1.get(configuration, `events.database.${module.name}.afterList`, null);
    const beforeView = lodash_1.get(configuration, `events.database.${module.name}.beforeView`, null);
    const afterView = lodash_1.get(configuration, `events.database.${module.name}.afterView`, null);
    const { bulkCreatedModule, bulkUpdatedModule } = exports.getSubscriptionConstants(module.name);
    let object = {
        mutations: {
            [`bulkDelete${module.name}`]: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                if (overrideMutationBulkDelete && overrideMutationBulkDelete.constructor == Function) {
                    let response = yield overrideMutationBulkDelete(_, args, context, info);
                    return response;
                }
                const finalArgs = lodash_1.isFunction(beforeBulkDelete)
                    ? yield beforeBulkDelete({
                        mode: "graphql",
                        params: { _, args, context, info },
                    })
                    : args;
                let model = context.wertik.models[module.name];
                yield model.destroy({ where: { id: finalArgs.input.id } });
                if (lodash_1.isFunction(afterBulkDelete)) {
                    yield afterBulkDelete({
                        mode: "graphql",
                        params: { _, args, context, info },
                    });
                }
                return { message: `${module.name} deleted successfully.` };
            }),
            [`bulkCreate${module.name}`]: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                if (overrideMutationBulkCreate && overrideMutationBulkCreate.constructor == Function) {
                    let response = yield overrideMutationBulkCreate(_, args, context, info);
                    return response;
                }
                const finalArgs = lodash_1.isFunction(beforeBulkCreate)
                    ? yield beforeBulkCreate({
                        mode: "graphql",
                        params: { _, args, context, info },
                    })
                    : args;
                let model = context.wertik.models[module.name];
                let result = yield model.bulkCreate(finalArgs.input);
                pubsub.publish(bulkCreatedModule, {
                    [bulkCreatedModule]: result,
                });
                if (lodash_1.isFunction(afterBulkCreate)) {
                    afterBulkCreate({
                        mode: "graphql",
                        params: { _, args, context, info, instance: result },
                    });
                }
                return {
                    returning: result,
                };
            }),
            [`bulkUpdate${module.name}`]: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                if (overrideMutationBulkUpdate && overrideMutationBulkUpdate.constructor == Function) {
                    let response = yield overrideMutationBulkUpdate(_, args, context, info);
                    return response;
                }
                const finalArgs = lodash_1.isFunction(beforeBulkUpdate)
                    ? yield beforeBulkUpdate({
                        mode: "graphql",
                        params: { _, args, context, info },
                    })
                    : args;
                let model = context.wertik.models[module.name];
                let result = yield model.bulkCreate(finalArgs.input, {
                    updateOnDuplicate: ["id"],
                });
                pubsub.publish(bulkUpdatedModule, {
                    [bulkUpdatedModule]: result,
                });
                if (lodash_1.isFunction(afterBulkUpdate)) {
                    afterBulkUpdate({
                        mode: "graphql",
                        params: { _, args, context, info, instance: result },
                    });
                }
                return {
                    returning: result,
                    affectedRows: result.length,
                };
            }),
        },
        queries: {
            [`count${module.name}`]: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                let model = context.wertik.models[module.name];
                const filters = yield convertFiltersIntoSequalizeObject_1.default(args ? args.filters || {} : {});
                let count = yield model.count({
                    where: filters,
                });
                return count;
            }),
            [`view${module.name}`]: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                if (overrideQueryView && overrideQueryView.constructor == Function) {
                    let response = yield overrideQueryView(_, args, context, info);
                    return response;
                }
                const finalArgs = lodash_1.isFunction(beforeList)
                    ? yield beforeView({
                        mode: "graphql",
                        params: { _, args, context, info },
                    })
                    : args;
                let model = context.wertik.models[module.name];
                let requestedFields = getRequestedFieldsFromResolverInfo_1.default(info);
                let view = yield model.findOne({
                    where: { id: finalArgs.id },
                    attributes: index_1.removeColumnsFromAccordingToSelectIgnoreFields(Object.keys(requestedFields), model.selectIgnoreFields),
                });
                if (lodash_1.isFunction(afterView)) {
                    afterView({
                        mode: "graphql",
                        params: { _, args, context, info, instance: view },
                    });
                }
                return view;
            }),
            [`list${module.name}`]: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                let response;
                if (overrideQueryList && overrideQueryList.constructor == Function) {
                    let response = yield overrideQueryList(_, args, context, info);
                    return response;
                }
                const finalArgs = lodash_1.isFunction(beforeList)
                    ? yield beforeList({
                        mode: "graphql",
                        params: { _, args, context, info },
                    })
                    : args;
                const cacheWith = (args.cache && args.cache.name) || "";
                const cacheValue = context.wertik.cache.get(cacheWith);
                if (cacheWith && cacheValue) {
                    response = cacheValue;
                }
                else {
                    let model = context.wertik.models[module.name];
                    let requestedFields = getRequestedFieldsFromResolverInfo_1.default(info);
                    response = yield model.paginate(finalArgs, Object.keys(requestedFields.list));
                }
                if (lodash_1.isFunction(afterList)) {
                    afterList({
                        mode: "graphql",
                        params: { _, args, context, info, instance: response },
                    });
                }
                if (cacheWith) {
                    context.wertik.cache.set(cacheWith, response, (args.cache && args.cache.expiry) || 0);
                }
                return response;
            }),
        },
    };
    return object;
};
exports.generateModuleSearchShema = (module) => {
    let string = `
    input ${module.name}FilterInput {
      _or: [${module.name}FilterInput]
      _and: [${module.name}FilterInput]
  `;
    string = `${string}
      id: IntFilterInput
      created_at: DateFilterInput
      updated_at: DateFilterInput
    `;
    const fields = lodash_1.get(module, "database.sql.fields", {});
    const keys = Object.keys(fields);
    keys.forEach((key) => {
        const field = fields[key];
        const getType = () => {
            const type = field.oldType.toLowerCase();
            if (type === "string") {
                return "String";
            }
            else if (type === "integer") {
                return "Int";
            }
            else if (type === "boolean") {
                return "Boolean";
            }
        };
        string =
            string +
                `
      ${key}: ${getType()}FilterInput
      `;
    });
    string = string + " }";
    return string;
};
exports.generateListTypeForModule = (module) => {
    return `
    ${exports.generateModuleSearchShema(module)}
    type ${module.name}List {
      list: [${module.name}]
      pagination: Pagination
      filters: [Filter]
      sorting: Sorting
      paginationProperties: PaginationProperties
    }
    type ${module.name}BulkMutationResponse {
      returning: [${module.name}]
      affectedRows: Int
    }
    type Count${module.name} {
      count: Int
    }
  `;
};
//# sourceMappingURL=crudGenerator.js.map