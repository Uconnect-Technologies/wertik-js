module.exports = {
    description: 'Create modules for Node JS Graphql MySQL',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the module name, this includes name of Model,Table,schemaName and Controller Name (lowercase):',
        },
    ],
    actions: (data)=> {
        
    }
}