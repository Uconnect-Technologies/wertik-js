import { IConfiguration } from "./configuration";

export interface IGraphQLInitialize {
  apolloGraphqlOptions: any;
  sendEmail: Function;
  expressApp: any;
  configuration: IConfiguration;
  dbTables: Array<any>;
  models: any;
  emailTemplates: Object;
  database: any;
  WertikEventEmitter: any;
  mailerInstance: any;
  socketio: any;
  logger: any;
}

export interface IRestApiInitialize {
  sendEmail: Function;
  configuration: IConfiguration;
  mailerInstance: any;
  expressApp: any;
  dbTables: Array<any>;
  emailTemplates: any;
  models: any;
  database: any;
  WertikEventEmitter: any;
  multerInstance: any;
  socketio: any;
  logger: any;
}

export interface ISocketConfiguration {
  onMessageReceived: Function;
  onClientConnected: Function;
  onClientDisconnect: Function;
  disable: Boolean;
}
