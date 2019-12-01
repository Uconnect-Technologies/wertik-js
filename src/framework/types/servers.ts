import {IConfiguration} from "./configuration";

export interface IGraphQLInitialize {
  expressApp: any;
  configuration: IConfiguration;
  dbTables: Array<any>;
  models: any;
  emailTemplates: Object;
  sendEmail: Function;
  database: any;
  WertikEventEmitter: any;
  context: any;
}

export interface IRestApiInitialize {
  expressApp: any;
  configuration: IConfiguration;
  dbTables: Array<any>;
  models: any;
  emailTemplates: any;
  sendEmail: Function;
  database: any;
  WertikEventEmitter: any;
  context: any;
}