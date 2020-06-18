import { ISocketConfiguration } from "./servers";
import { IConfigurationOverride } from "./override";
import { IConfigurationRbac } from "./rbac";
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
  tableName: String;
  tableOptions: Object;
}
export interface IConfigurationCustomModuleDatabaseMongo {
  tableName: String;
  schema: Object;
  onReady?: Function;
}

export interface IConfigurationCustomModuleDatabaseRelationshipType {
  moduleName: string;
  thatModuleAttribute: string;
  thisModuleAttribute: string;
}

/*

  Defines relationship for modoules. This relationship feature will map through:

  1. Custom Module
  2. Rest API 
  3. GraphQL && GraphQL Relation

*/

export interface IConfigurationCustomModuleDatabaseRelationship {
  hasOne: Array<IConfigurationCustomModuleDatabaseRelationshipType>;
  hasMany: Array<IConfigurationCustomModuleDatabaseRelationshipType>;
  belongsTo: Array<IConfigurationCustomModuleDatabaseRelationshipType>;
  belongsToMany: Array<IConfigurationCustomModuleDatabaseRelationshipType>;
}

export interface IConfigurationCustomModuleDatabase {
  sql: IConfigurationCustomModuleDatabaseSql;
  mongo: IConfigurationCustomModuleDatabaseMongo;
  relationship: IConfigurationCustomModuleDatabaseRelationship;
}

export interface IConfigurationCustomModule {
  name: String;
  graphql: IConfigurationCustomModuleGraphql;
  restApi: IConfigurationCustomModuleRestApi;
  database: IConfigurationCustomModuleDatabase;
}

export interface IConfigurationDatabase {
  dbDialect: String;
  dbConnectionString?: String;
  dbUsername?: String;
  dbPassword?: String;
  dbName?: String;
  dbHost?: String;
  dbPort?: String;
  mongoDBURI?: String;
  dbInitializeOptions: {
    [Key: string]: any;
  };

  // MongoDB
}

export interface IDocServerConfiguration {
  configuration: IConfiguration;
}

export interface IConfigurationEvents {
  beforeRestApiStart?: Function;
  beforeGraphqlStart?: Function;
  database?: {
    [Key: string]: {
      // Cud
      beforeCreate: Function;
      afterCreate: Function;
      beforeSave: Function;
      afterSave: Function;
      beforeUpdate: Function;
      afterUpdate: Function;
      beforeDelete: Function;
      afterDelete: Function;
      beforeSoftDelete: Function;
      afterSoftDelete: Function;
      beforeBulkDelete: Function;
      afterBulkDelete: Function;
      beforeBulkSoftDelete: Function;
      afterBulkSoftDelete: Function;
      beforeBulkCreate: Function;
      afterBulkCreate: Function;
      beforeBulkSoftCreate: Function;
      afterBulkSoftCreate: Function;
      beforeBulkUpdate: Function;
      afterBulkUpdate: Function;
      beforeBulkSoftUpdate: Function;
      afterBulkSoftUpdate: Function;
      // R
      beforeList: Function;
      afterList: Function;
      beforeView: Function;
      afterView: Function;
      beforeById: Function;
      afterById: Function;
      beforeByModule: Function;
      afterByModule: Function;
    };
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

export interface IConfigurationStorage {
  disable: Boolean;
  storageDirectory: string;
}

export interface IConfigurationEmail {
  disable: boolean;
  defaultMailerInstance: any; // This can be the mailer instance a user is using, Just like node mailer
  sendEmail: Function; // A function that uses IConfigurationEmail.defaultEmailInstance and sends an email
  configuration: any; // This can be string or object, A string of connection string for smtp mailer or configuration for node mailer
  templates: {
    [Key: string]: String;
  };
}

export interface IConfigurationCron {
  disable: Boolean;
  cronList: Array<{
    expression: string;
    function: Function;
    options: Object;
    events: {
      initialized: Function;
    };
  }>;
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
  database: IConfigurationDatabase;
  frontendAppUrl: String;
  frontendAppActivationUrl: String;
  frontendAppPasswordResetUrl: String;
  context: {
    [Key: string]: any;
  };
  email: IConfigurationEmail;
  override: IConfigurationOverride;
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
  rbac: IConfigurationRbac;
  storage: IConfigurationStorage;
  cron: IConfigurationCron;
}
