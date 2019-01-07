module.exports = {
    description: 'Create modules for Node JS Graphql MySQL',
    prompts: [
        {
            type: 'input',
            name: 'name',
            reuired: true,
            message: 'Enter (module,tableName) name, use camel case.',
        },
        {
            type: 'input',
            name: 'fields',
            reuired: true,
            message: 'Enter table fields, field:type with space separated fields, For example: name:string age:number',
        },
    ],
    actions: (data)=> {
        let actions = [];
        if (data.name && data.fields) {
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/controller.js`,
                templateFile: './templates/controller.hbs',
            });
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/model.js`,
                templateFile: './templates/model.hbs',
            });
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/mutations.js`,
                templateFile: './templates/mutations.hbs',
            });
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/queries.js`,
                templateFile: './templates/queries.hbs',
            });
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/rest.js`,
                templateFile: './templates/rest.hbs',
            });
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/schema.js`,
                templateFile: './templates/schema.hbs',
            });
            actions.push({
                type: 'add',
                path: `files/${+new Date()}/table.js`,
                templateFile: './templates/table.hbs',
            });
        }
        return actions;

    }
}