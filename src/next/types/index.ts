import { Sequelize } from "sequelize/types"
import { useDatabaseProps } from "./database"

export type iObject = { [key: string]: any }

export interface Store {
  graphql: {
    typeDefs: String
    resolvers: {
      Query: {
        [key: string]: Function
      }
      Mutation: {
        [key: string]: Function
      }
    }
  }
  database: {
    relationships: Array<iObject>
  }
}

export interface WertikConfiguration {
  /**
   * Port number on which your will run.
   */
  port: number
  /**
   * [Optional] If you have already created express app. You can pass here.
   */
  express?: any
  /**
   * [Optional] If you have already created httpServer. You can pass here.
   */
  httpServer?: iObject
  /**
   * [Optional] When passed as true, Wertik will not start server.
   */
  skip?: boolean
  /**
   * Database connections
   */
  database?: {
    [key: string]: () => Promise<{
      credentials: useDatabaseProps
      instance: Sequelize
    }>
  }
  /**
   * Modules
   */
  modules?: {
    [key: string]: ({
      store: Store,
      configuration: WertikConfiguration,
      app: WertikApp,
    }) => iObject
  }
  /**
   * Storage
   */
  storage?: {
    [key: string]: ({
      configuration: WertikConfiguration,
      wertikApp: WertikApp,
    }) => {
      spacesEndpoint?: iObject
      s3?: iObject
      dropbox?: iObject
    }
  }
  /**
   * Mailer
   */
  mailer?: {
    [key: string]: () => Promise<unknown>
  }
  /**
   * Sockets
   */
  sockets?: {
    [key: string]: ({
      configuration: WertikConfiguration,
      wertikApp: WertikApp,
    }) => iObject
  }
  /**
   * Graphql
   */
  graphql?: ({
    store: Store,
    configuration: WertikConfiguration,
    wertikApp: WertikApp,
    expressApp: any,
  }) => iObject
  /**
   * Cron Jobs
   */
  cronJobs?: {
    [key: string]: ({
      configuration: WertikConfiguration,
      wertikApp: WertikApp,
    }) => iObject
  }

  /**
   * Redis
   */
  redis?: {
    [key: string]: ({
      configuration: WertikConfiguration,
      wertikApp: WertikApp,
    }) => iObject
  }
}

export interface WertikApp {
  sendEmail?: ({ mailer: string, options: emailSendProps }) => iObject
  port: number
  modules: iObject
  database: iObject
  mailer: iObject
  graphql: iObject
  sockets: iObject
  cronJobs: iObject
  storage: iObject
  [key: string]: any
}

/**
 * Provide same options that redis createClient method requires.
 */
export interface useRedisOptions {
  [key: string]: any
  name: string;
}
