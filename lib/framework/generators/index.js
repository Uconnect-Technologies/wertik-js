"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapFieldsToGraphqlSchemaFields_1 = __importDefault(require("./helpers/mapFieldsToGraphqlSchemaFields"));
const mapRelationFieldsToSchema_1 = __importDefault(require("./helpers/mapRelationFieldsToSchema"));
const mapFieldsToValidations_1 = require("./helpers/mapFieldsToValidations");
module.exports = function (plop) {
    plop.setHelper('mapFieldsToGraphqlSchemaFields', (data) => mapFieldsToGraphqlSchemaFields_1.default(data));
    plop.setHelper("mapRelationFieldsToSchema", (data) => mapRelationFieldsToSchema_1.default(data));
    plop.setHelper('createValidation', (data) => mapFieldsToValidations_1.createValidation(data));
    plop.setHelper('updateValidation', (data) => mapFieldsToValidations_1.updateValidation(data));
    plop.setHelper('deleteValidation', (data) => mapFieldsToValidations_1.deleteValidation(data));
    plop.setHelper('bulkDeleteValidation', (data) => mapFieldsToValidations_1.bulkDeleteValidation(data));
    plop.setHelper('bulkUpdateValidation', (data) => mapFieldsToValidations_1.bulkUpdateValidation(data));
    plop.setHelper('viewValidation', (data) => mapFieldsToValidations_1.viewValidation(data));
    // controller generator
    plop.setGenerator('controller', {
        description: 'application controller logic',
        prompts: [
            {
                type: 'input',
                name: 'moduleName',
                message: 'Write your module name in camel case, For example: userGames, userPlays, userGameWins.'
            },
            {
                type: 'input',
                name: 'moduleFields',
                message: 'Write fields for your module with space provided, cYou can use fieldName:type. For example age:Int.'
            },
            {
                type: 'input',
                name: 'validations',
                message: `Enter validations for your module. 
For example this module has many games you can write games:many or if module has only one game you can write games:one. 
Donot Skip reading: Make sure that you write correct module name, Otherwise Graphql will through erorrs. 
If errors, It will be harder to fix issues. .
                `
            }
        ],
        actions: function (data) {
            let { moduleName, moduleFields } = data;
            if (!moduleName || !moduleFields) {
                throw new Error("You should pass moduleName and moduleFields");
            }
            return [
                {
                    type: 'add',
                    path: 'src/mutation',
                    templateFile: 'templates/mutation.hbs'
                },
                {
                    type: 'add',
                    path: 'src/query',
                    templateFile: 'templates/query.hbs'
                },
                {
                    type: 'add',
                    path: 'src/resolver',
                    templateFile: 'templates/resolver.hbs'
                },
                {
                    type: 'add',
                    path: 'src/schema',
                    templateFile: 'templates/schema.hbs'
                },
                {
                    type: 'add',
                    path: 'src/validations',
                    templateFile: 'templates/validations.hbs'
                }
            ];
        }
    });
};
//# sourceMappingURL=index.js.map