### Custom Modules

**Type:** Array<IConfigurationCustomModule>

With this guide, you can extend your app with extra modules and functionality. Please refer to this module for getting familiar with modules: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/forgetPassword/index.ts.

### Configuration explained

### name

**Type:** String
**Default Value:** null
**Description:** The name of module.

### useDatabase

**Type:** Boolean
**Default Value:** true
**Description:** Define whether the module uses database or not. If false, database property is not required.

### graphql

**Type:** Object
**Default Value:** {}
**Description:** The graphql will add graphql features to module.

### restApi

**Type:** Object
**Default Value:** {}
**Description:** With this option you can add endpoints to your modules.

### database

**Type:** Object
**Default Value:** {}
**Description:** Defines current module database table. This includes, fields, relationships, which fields to ignore while executing graphql schema. Please visit database section of above shared module: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/forgetPassword/index.ts#L118.
