import { ISocketConfiguration } from "./servers";
export interface IConfigurationPorts {
  graphql: Number;
  restApi: Number;
}

export interface IConfigurationCustomModuleGraphqlCrudQuery {
  generate: Boolean;
  operations: String;
}

export interface IConfigurationCustomModuleGraphqlCrudMutation {
  generate: Boolean;
  operations: String;
}

export interface IConfigurationCustomModuleGraphqlCrud {
  query: IConfigurationCustomModuleGraphqlCrudQuery;
  mutation: IConfigurationCustomModuleGraphqlCrudMutation;
}
export interface IConfigurationCustomModuleGraphqlMutation {
  schema: String;
  resolvers: Object;
}
export interface IConfigurationCustomModuleGraphqlQuery {
  schema: String;
  resolvers: Object;
}

export interface IConfigurationCustomModuleGraphql {
  crud: IConfigurationCustomModuleGraphqlCrud;
  schema: String;
  relations: {
    [Key: string]: Function;
  };
  mutation: IConfigurationCustomModuleGraphqlMutation;
  query: IConfigurationCustomModuleGraphqlQuery;
}

export interface IConfigurationCustomModuleRestApiDocs {
  description: String;
  params: String;
  response: String;
  title: String;
}

export interface IConfigurationCustomModuleRestApiEndpoint {
  path: String;
  methodType: String;
  docs: IConfigurationCustomModuleRestApiDocs;
  handler: Function;
}

export interface IConfigurationCustomModuleRestApi {
  endpoints: Array<IConfigurationCustomModuleRestApiEndpoint>;
}

export interface IConfigurationCustomModuleDatabaseSql {
  fields: Object;
}

export interface IConfigurationCustomModuleDatabase {
  sql: IConfigurationCustomModuleDatabaseSql;
}

export interface IConfigurationCustomModule {
  name: String;
  graphql: IConfigurationCustomModuleGraphql;
  restApi: IConfigurationCustomModuleRestApi;
  database: IConfigurationCustomModuleDatabase;
}

export interface IConfigurationMysqlOptions {
  dbUsername: String;
  dbPassword: String;
  dbName: String;
  dbHost: String;
  dbPort: String;
}

export interface IDocServerConfiguration {
  configuration: IConfiguration;
}

export interface IConfigurationEvents {
  beforeRestApiStart?: Function;
  beforeGraphqlStart?: Function;
  crud?: {
    [Key: string]: Function;
  };
}

export interface IConfigurationContext {
  data: Object;
  createContext: Function;
}

export interface IConfigurationRestApi {
  disable: Boolean;
  port: Number;
}

export interface IConfigurationGraphql {
  disable: Boolean;
  port: Number;
}

export interface IConfigurationSecurity {
  allowedIpAddresses: Array<String>;
}

export interface IConfiguration {
  dbDialect: String;
  name: String;
  builtinModules: String;
  extendBuiltinModules: {
    [Key: string]: {
      database: {
        tableFieds: any;
      };
      graphql: {
        mainSchemaExtend: String;
        inputSchemaExtend: String;
      };
    };
  };
  mysqlOptions: IConfigurationMysqlOptions;
  frontendAppUrl: String;
  frontendAppActivationUrl: String;
  frontendAppPasswordResetUrl: String;
  context: {
    [Key: string]: any;
  };
  restApi: IConfigurationRestApi;
  graphql: IConfigurationGraphql;
  forceStartGraphqlServer: Boolean;
  forceStartRestApiServer: Boolean;
  ports: IConfigurationPorts;
  modules: Array<IConfigurationCustomModule>;
  events: IConfigurationEvents;
  seeds: any;
  sockets: ISocketConfiguration;
  security: IConfigurationSecurity;
}
