import { ISocketConfiguration } from "./servers";
import { IConfigurationOverride } from "./override";
import { IConfigurationRbac } from "./rbac";

export interface IConfigurationCustomModuleGraphqlCrudQuery {
  generate: Boolean;
  operations: string;
}

export interface IConfigurationCustomModuleGraphqlCrudMutation {
  generate: Boolean;
  operations: string;
}

export interface IConfigurationCustomModuleGraphqlCrud {
  query: IConfigurationCustomModuleGraphqlCrudQuery;
  mutation: IConfigurationCustomModuleGraphqlCrudMutation;
}
export interface IConfigurationCustomModuleGraphqlMutation {
  schema: string;
  resolvers: Object;
}
export interface IConfigurationCustomModuleGraphqlQuery {
  schema: string;
  resolvers: Object;
}

export interface IConfigurationCustomModuleGraphql {
  crud: IConfigurationCustomModuleGraphqlCrud;
  schema: string;
  customResolvers: {
    [Key: string]: Function;
  };
  mutation: IConfigurationCustomModuleGraphqlMutation;
  query: IConfigurationCustomModuleGraphqlQuery;
}

export interface IConfigurationCustomModuleRestApiEndpoint {
  path: string;
  methodType: string;
  handler: Function;
}

export interface IConfigurationCustomModuleRestApi {
  endpoints: Array<IConfigurationCustomModuleRestApiEndpoint>;
}

export interface IConfigurationCustomModuleDatabaseSql {
  fields: Object;
  tableName: string;
  tableOptions: Object;
}
export interface IConfigurationCustomModuleDatabaseMongo {
  tableName: string;
  schema: Object;
  onReady?: Function;
}

/*

  Defines the type of relationship with another table. If options is passed foreignKey will be ignored. You can also add foreignKey in options.

  SQL/PostgreSQL(Sequelize): https://sequelize.org/master/manual/assocs.html
  MongoDB(Mongoose): https://mongoosejs.com/docs/guide.html#definition

  */

export interface IConfigurationCustomModuleDatabaseRelationshipOneToOne {
  relationColumn: string;
  foreignKey: string;
  graphqlName: string;
  options: {
    [Key: string]: any;
  };
}
export interface IConfigurationCustomModuleDatabaseRelationshipOneToMany {
  foreignKey: string;
  graphqlName: string;
  options: {
    [Key: string]: any;
  };
}

/*

  Defines relationship for modoules. This relationship feature will map through:

  1. Custom Module
  2. Rest API 
  3. GraphQL && GraphQL Relation

*/

export interface IConfigurationCustomModuleDatabaseRelationship {
  oneToOne: {
    [key: string]: IConfigurationCustomModuleDatabaseRelationshipOneToOne;
  };
  oneToMany: {
    [key: string]: IConfigurationCustomModuleDatabaseRelationshipOneToMany;
  };
  // hasOne: {
  //   [key: string]: IConfigurationCustomModuleDatabaseRelationshipType;
  // },
  // hasMany: {
  //   [key: string]: IConfigurationCustomModuleDatabaseRelationshipType;
  // },
  // belongsTo: {
  //   [key: string]: IConfigurationCustomModuleDatabaseRelationshipType;
  // }
}

export interface IConfigurationCustomModuleDatabase {
  sql: IConfigurationCustomModuleDatabaseSql;
  mongo: IConfigurationCustomModuleDatabaseMongo;
  relationships: IConfigurationCustomModuleDatabaseRelationship;
  selectIgnoreFields: Array<string>;
}

export interface IConfigurationCustomModule {
  name: string;
  graphql: IConfigurationCustomModuleGraphql;
  restApi: IConfigurationCustomModuleRestApi;
  database: IConfigurationCustomModuleDatabase;
}

export interface IConfigurationDatabase {
  dbDialect: string;
  dbConnectionstring?: string;
  dbUsername?: string;
  dbPassword?: string;
  dbName?: string;
  dbHost?: string;
  dbPort?: string;
  mongoDBURI?: string;
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
  initializeContext: Function;
  requestContext: Function;
}

export interface IConfigurationRestApi {
  disable: Boolean;
  port: Number;
  onCustomApiFailure: Function;
}

export interface IConfigurationGraphql {
  disable: Boolean;
  path: string;
  graphqlVoyagerPath: string;
  disableGraphqlVoyager: Boolean;
}

export interface IConfigurationSecurity {
  allowedIpAddresses: Array<string>;
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
    [Key: string]: string;
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
  dbDialect: string;
  name: string;
  builtinModules: string;
  expressApp: any;
  port: number;
  extendBuiltinModules: {
    [Key: string]: {
      database: {
        tableFieds: any;
      };
      graphql: {
        mainSchemaExtend: string;
        inputSchemaExtend: string;
      };
    };
  };
  database: IConfigurationDatabase;
  frontendAppUrl: string;
  frontendAppActivationUrl: string;
  frontendAppPasswordResetUrl: string;
  context: {
    [Key: string]: any;
  };
  email: IConfigurationEmail;
  override: IConfigurationOverride;
  restApi: IConfigurationRestApi;
  graphql: IConfigurationGraphql;
  modules: Array<IConfigurationCustomModule>;
  events: IConfigurationEvents;
  seeds: any;
  sockets: ISocketConfiguration;
  security: IConfigurationSecurity;
  rbac: IConfigurationRbac;
  storage: IConfigurationStorage;
  cron: IConfigurationCron;
}
