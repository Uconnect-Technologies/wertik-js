import {ISocketConfiguration} from "./servers";
export interface IConfigurationPorts {
  graphql: Number;
  restApi: Number;
}

export interface IConfigurationCustomModuleGraphqlCrudQuery {
  generate: Boolean,
  operations: String
}

export interface IConfigurationCustomModuleGraphqlCrudMutation {
  generate: Boolean,
  operations: String
}

export interface IConfigurationCustomModuleGraphqlCrud {
  query: IConfigurationCustomModuleGraphqlCrudQuery;
  mutation: IConfigurationCustomModuleGraphqlCrudMutation;
}
export interface IConfigurationCustomModuleGraphqlMutation {
  schema: String
  resolvers: Object
}
export interface IConfigurationCustomModuleGraphqlQuery {
  schema: String
  resolvers: Object
}

export interface IConfigurationCustomModuleGraphql {
  crud: IConfigurationCustomModuleGraphqlCrud
  schema: String
  mutation: IConfigurationCustomModuleGraphqlMutation
  query: IConfigurationCustomModuleGraphqlQuery
}

export interface IConfigurationCustomModuleRestApiEndpoint {
  path: String;
  methodType: String;
  handler: Function;
}

export interface IConfigurationCustomModuleRestApi {
  endpoints: Array<IConfigurationCustomModuleRestApiEndpoint>
}

export interface IConfigurationCustomModuleDatabaseSql {
  fields: Object
}

export interface IConfigurationCustomModuleDatabase {
  sql: IConfigurationCustomModuleDatabaseSql
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

export interface IConfigurationEvents {
  beforeRestApiStart: Function;
  beforeGraphqlStart: Function;
}

export interface IConfigurationContext {
  data: Object;
  createContext: Function
}

export interface IConfiguration {
  dbDialect: String;
  name: String;
  builtinModules: String;
  mysqlOptions: IConfigurationMysqlOptions
  frontendAppUrl: String;
  frontendAppActivationUrl: String;
  frontendAppPasswordResetUrl: String;
  context: Object;
  forceStartGraphqlServer: Boolean;
  forceStartRestApiServer: Boolean;
  ports: IConfigurationPorts;
  modules: Array<IConfigurationCustomModule>;
  events: IConfigurationEvents;
  seeds: any;
  sockets: ISocketConfiguration
}