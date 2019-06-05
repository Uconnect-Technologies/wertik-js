
import mapFieldsToGraphqlSchemaFields from "./helpers/mapFieldsToGraphqlSchemaFields";
import mapRelationFieldsToSchema from "./helpers/mapRelationFieldsToSchema";
import { createValidation,updateValidation,deleteValidation, bulkDeleteValidation, bulkUpdateValidation, viewValidation} from "./helpers/mapFieldsToValidations"
module.exports = function (plop: any) {
    plop.setHelper('mapFieldsToGraphqlSchemaFields',(data: any) => mapFieldsToGraphqlSchemaFields(data) );
    plop.setHelper("mapRelationFieldsToSchema",(data: any) => mapRelationFieldsToSchema(data) );
    plop.setHelper('createValidation',(data: any) => createValidation(data) )
    plop.setHelper('updateValidation',(data: any) => updateValidation(data) )
    plop.setHelper('deleteValidation',(data: any) => deleteValidation(data) )
    plop.setHelper('bulkDeleteValidation',(data: any) => bulkDeleteValidation(data) )
    plop.setHelper('bulkUpdateValidation',(data: any) => bulkUpdateValidation(data) )
    plop.setHelper('viewValidation',(data: any) => viewValidation(data) )
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
        actions: function (data: any) {
            let {moduleName, moduleFields} = data;
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