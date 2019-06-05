System.register(["./helpers/mapFieldsToGraphqlSchemaFields", "./helpers/mapRelationFieldsToSchema", "./helpers/mapFieldsToValidations"], function (exports_1, context_1) {
    "use strict";
    var mapFieldsToGraphqlSchemaFields_1, mapRelationFieldsToSchema_1, mapFieldsToValidations_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (mapFieldsToGraphqlSchemaFields_1_1) {
                mapFieldsToGraphqlSchemaFields_1 = mapFieldsToGraphqlSchemaFields_1_1;
            },
            function (mapRelationFieldsToSchema_1_1) {
                mapRelationFieldsToSchema_1 = mapRelationFieldsToSchema_1_1;
            },
            function (mapFieldsToValidations_1_1) {
                mapFieldsToValidations_1 = mapFieldsToValidations_1_1;
            }
        ],
        execute: function () {
            module.exports = function (plop) {
                plop.setHelper('mapFieldsToGraphqlSchemaFields', function (data) { return mapFieldsToGraphqlSchemaFields_1["default"](data); });
                plop.setHelper("mapRelationFieldsToSchema", function (data) { return mapRelationFieldsToSchema_1["default"](data); });
                plop.setHelper('createValidation', function (data) { return mapFieldsToValidations_1.createValidation(data); });
                plop.setHelper('updateValidation', function (data) { return mapFieldsToValidations_1.updateValidation(data); });
                plop.setHelper('deleteValidation', function (data) { return mapFieldsToValidations_1.deleteValidation(data); });
                plop.setHelper('bulkDeleteValidation', function (data) { return mapFieldsToValidations_1.bulkDeleteValidation(data); });
                plop.setHelper('bulkUpdateValidation', function (data) { return mapFieldsToValidations_1.bulkUpdateValidation(data); });
                plop.setHelper('viewValidation', function (data) { return mapFieldsToValidations_1.viewValidation(data); });
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
                            message: "Enter validations for your module. \nFor example this module has many games you can write games:many or if module has only one game you can write games:one. \nDonot Skip reading: Make sure that you write correct module name, Otherwise Graphql will through erorrs. \nIf errors, It will be harder to fix issues. .\n                "
                        }
                    ],
                    actions: function (data) {
                        var moduleName = data.moduleName, moduleFields = data.moduleFields;
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
        }
    };
});
//# sourceMappingURL=index.js.map