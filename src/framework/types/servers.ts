import { IConfiguration, IConfigurationSecurity } from "./configuration";

export interface IGraphQLInitialize {
  sendEmail: Function;
  runEvent: Function;
  expressApp: any;
  configuration: IConfiguration;
  dbTables: Array<any>;
  models: any;
  emailTemplates: Object;
  database: any;
  WertikEventEmitter: any;
  mailerInstance: any;
  websockets: any;
}

export interface IRestApiInitialize {
  sendEmail: Function;
  runEvent: Function;
  configuration: IConfiguration;
  mailerInstance: any;
  expressApp: any;
  dbTables: Array<any>;
  emailTemplates: any;
  models: any;
  database: any;
  WertikEventEmitter: any;
  multerInstance: any;
  websockets: any;
}

// export interface IWSConfiguration {
//   port: Number
// }
export interface ISocketConfiguration {
  onMessageReceived: Function;
  onClientConnected: Function;
  onClientDisconnect: Function;
  disable: Boolean;
  port: Number;
  security: IConfigurationSecurity;
}
