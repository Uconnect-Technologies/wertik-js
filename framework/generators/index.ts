
import mapFieldsToGraphqlSchemaFields from "./helpers/mapFieldsToGraphqlSchemaFields.ts";
import mapFieldsToValidations from "./helpers/mapFieldsToValidations.ts";
import mapRelationFieldsToSchema from "./helpers/mapRelationFieldsToSchema.ts";
import { createValidation,updateValidation,deleteValidation, bulkDeleteValidation, bulkUpdateValidation, viewValidation} from "./helpers/mapFieldsToValidations.ts"
module.exports = function (plop) {
    plop.setHelper('mapFieldsToGraphqlSchemaFields',(data) => mapFieldsToGraphqlSchemaFields(data) );
    plop.setHelper("mapRelationFieldsToSchema",(data) => mapRelationFieldsToSchema(data) );
    plop.setHelper('createValidation',(data) => createValidation(data) )
    plop.setHelper('updateValidation',(data) => updateValidation(data) )
    plop.setHelper('deleteValidation',(data) => deleteValidation(data) )
    plop.setHelper('bulkDeleteValidation',(data) => bulkDeleteValidation(data) )
    plop.setHelper('bulkUpdateValidation',(data) => bulkUpdateValidation(data) )
    plop.setHelper('viewValidation',(data) => viewValidation(data) )
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
                    path: 'src/mutation.ts',
                    templateFile: 'templates/mutation.hbs'
                },
                {
                    type: 'add',
                    path: 'src/query.ts',
                    templateFile: 'templates/query.hbs'
                },
                {
                    type: 'add',
                    path: 'src/resolver.ts',
                    templateFile: 'templates/resolver.hbs'
                },
                {
                    type: 'add',
                    path: 'src/schema.ts',
                    templateFile: 'templates/schema.hbs'
                },
                {
                    type: 'add',
                    path: 'src/validations.ts',
                    templateFile: 'templates/validations.hbs'
                }
            ];
        }
    });
};