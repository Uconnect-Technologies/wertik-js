import { IConfiguration } from "./configuration"

export interface IGraphQLInitialize {
  sendEmail: Function
  expressApp: any
  configuration: IConfiguration
  dbTables: Array<any>
  models: any
  emailTemplates: Object
  database: any
  WertikEventEmitter: any
  mailerInstance: any
  socketio: any
  logger: any
}

export interface IRestApiInitialize {
  sendEmail: Function
  configuration: IConfiguration
  mailerInstance: any
  expressApp: any
  dbTables: Array<any>
  emailTemplates: any
  models: any
  database: any
  WertikEventEmitter: any
  multerInstance: any
  socketio: any
  logger: any
}

export interface ISocketConfiguration {
  onClientConnected: Function
  middlewares: Array<Function>
  disable: Boolean
  options: {
    [key: string]: any
  }
}
