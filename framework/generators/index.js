
import mapFieldsToGraphqlSchemaFields from "./helpers/mapFieldsToGraphqlSchemaFields.js";
import mapFieldsToValidations from "./helpers/mapFieldsToValidations.js";
import mapRelationFieldsToSchema from "./helpers/mapRelationFieldsToSchema.js";
module.exports = function (plop) {
    plop.setHelper('mapFieldsToGraphqlSchemaFields',function (data) {
        return mapFieldsToGraphqlSchemaFields(data);
    });
    plop.setHelper("mapFieldsToValidations",function (data) {
        return mapFieldsToValidations(data);
    });
    plop.setHelper("mapRelationFieldsToSchema",function (data) {
        return mapRelationFieldsToSchema(data);
    });
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
            let {moduleName, moduleFields} = data;
            if (!moduleName || !moduleFields) {
                throw new Error("You should pass moduleName and moduleFields");
            }
            return [
                {
                    type: 'add',
                    path: 'src/mutation.js',
                    templateFile: 'templates/mutation.hbs'
                },
                {
                    type: 'add',
                    path: 'src/query.js',
                    templateFile: 'templates/query.hbs'
                },
                {
                    type: 'add',
                    path: 'src/resolver.js',
                    templateFile: 'templates/resolver.hbs'
                },
                {
                    type: 'add',
                    path: 'src/schema.js',
                    templateFile: 'templates/schema.hbs'
                },
                {
                    type: 'add',
                    path: 'src/validations.js',
                    templateFile: 'templates/validations.hbs'
                }
            ];
        }
    });
};