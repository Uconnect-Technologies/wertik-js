import { IConfiguration } from "./configuration";

export interface IGraphQLInitialize {
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
  cache: any;
}

export interface IRestApiInitialize {
  sendEmail: Function;
  cache: any;
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
  options: {
    [key: string]: any
  }
}
