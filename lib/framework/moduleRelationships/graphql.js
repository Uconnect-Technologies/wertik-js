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
const index_1 = require("../helpers/index");
const getRequestedFieldsFromResolverInfo_1 = __importDefault(require("./../helpers/getRequestedFieldsFromResolverInfo"));
const processManyToManyRelationship = (relationshipInfo, key) => {
    return (parentRow, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        let model = context.wertik.models[key];
        let parentRowValue = parentRow[index_1.identityColumn()].toString();
        let requestedFields = getRequestedFieldsFromResolverInfo_1.default(info);
        if (!parentRowValue) {
            return null;
        }
        return yield model.paginate({
            filters: {
                [relationshipInfo.foreignKey]: {
                    _eq: parentRow[index_1.identityColumn()].toString(),
                },
            },
        }, Object.keys(requestedFields.list));
    });
};
const processOneToOneRelationship = (relationshipInfo, key) => {
    return (parentRow, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
        let requestedFields = getRequestedFieldsFromResolverInfo_1.default(info);
        let model = context.wertik.models[key];
        let parentRowValue = parentRow[relationshipInfo.relationColumn];
        if (!parentRowValue) {
            return null;
        }
        let a = yield model.findOne({
            where: {
                [relationshipInfo.foreignKey]: parentRowValue,
            },
            attributes: index_1.removeColumnsFromAccordingToSelectIgnoreFields(Object.keys(requestedFields), model.selectIgnoreFields),
        });
        return a;
    });
};
exports.GraphQLModuleRelationMapper = (module) => {
    let returnObject = {};
    let relationships = lodash_1.get(module, "database.relationships", null);
    if (relationships) {
        const oneToOne = lodash_1.get(relationships, "oneToOne", {});
        const oneToMany = lodash_1.get(relationships, "oneToMany", {});
        Object.keys(oneToMany).forEach((key) => {
            const relationshipInfo = oneToMany[key];
            if (relationshipInfo.constructor === Array) {
                relationshipInfo.forEach((relationshipInfoItem) => {
                    returnObject[relationshipInfoItem.graphqlName] = processManyToManyRelationship(relationshipInfoItem, key);
                });
            }
            else {
                returnObject[relationshipInfo.graphqlName] = processManyToManyRelationship(relationshipInfo, key);
            }
        });
        Object.keys(oneToOne).forEach((key) => {
            const relationshipInfo = oneToOne[key];
            if (relationshipInfo.constructor === Array) {
                relationshipInfo.forEach((relationshipInfoItem) => {
                    returnObject[relationshipInfoItem.graphqlName] = processOneToOneRelationship(relationshipInfoItem, key);
                });
            }
            else {
                returnObject[relationshipInfo.graphqlName] = processOneToOneRelationship(relationshipInfo, key);
            }
        });
    }
    return returnObject;
};
//# sourceMappingURL=graphql.js.map