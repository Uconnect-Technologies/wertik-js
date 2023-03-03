import { Sequelize } from "sequelize/types"
import { useMysqlDatabaseProps } from "./database"
import { SendEmailProps } from "./mailer"
import { WertikModule } from "./modules"

export type iObject = { [key: string]: any }

export interface Store {
  graphql: {
    graphqlKeys: string[]
    typeDefs: string
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
   * App environment, production,
   */
  appEnv?: "production" | "development" | "local"

  /**
   * Port number on which your will run.
   */
  port?: number
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
      credentials: useMysqlDatabaseProps
      instance: Sequelize
    }>
  }
  /**
   * Modules
   */
  modules?: {
    [key: string]: (options: {
      store: Store
      configuration: WertikConfiguration
      app: WertikApp
    }) => Promise<WertikModule>
  }
  /**
   * Storage
   */
  storage?: {
    [key: string]: (options: {
      configuration: WertikConfiguration
      wertikApp: WertikApp
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
    instances: {
      [key: string]: () => Promise<unknown>
    }
    events?: {
      /**
       * Runs when email sents successfully.
       */
      onEmailSent?: (options: {
        options: iObject
        wertikApp: WertikApp
        configuration: WertikConfiguration
        emailInstance: any
        previewURL: string | boolean
        mailer: String
      }) => void | any | null | undefined
      /**
       * Runs when email fails to send.
       */
      onEmailSentFailed?: (options: {
        mailer: String
        wertikApp: WertikApp
        configuration: WertikConfiguration
        error: any
        options: iObject
      }) => void | any | null | undefined
    }
  }
  /**
   * Sockets
   */
  sockets?: {
    [key: string]: (options: {
      configuration: WertikConfiguration
      wertikApp: WertikApp
    }) => iObject
  }
  /**
   * Graphql
   */
  graphql?: (options: {
    store: Store
    configuration: WertikConfiguration
    wertikApp: WertikApp
    expressApp: any
  }) => iObject
  /**
   * Cron Jobs
   */
  cronJobs?: {
    [key: string]: (options: {
      configuration: WertikConfiguration
      wertikApp: WertikApp
    }) => iObject
  }
  queue?: {
    options?: {
      /**
       * When set to true, Wertik JS will use Bull Board UI for Queue Jobs, make sure you have installed this package: @bull-board/express
       */
      useBullBoard?: boolean
      /**
       * Path on which Queue UI will run.
       * @default /admin/queues
       */
      uiPath: string
    }
    jobs: {
      [key: string]: () => iObject
    }
  }
  /**
   * Redis
   */
  redis?: {
    [key: string]: (options: {
      configuration: WertikConfiguration
      wertikApp: WertikApp
    }) => iObject
  }

  /**
   * Winston Logger
   */
  logger?: any
}

export interface WertikApp {
  appEnv: "production" | "development" | "local"
  sendEmail?: (options: { mailer: string; options: SendEmailProps }) => iObject
  port: number
  modules: {
    [key: string]: WertikModule
  }
  database: {
    [key: string]: {
      credentials: {
        port: number
        name: string
        password: string
        username: string
        host: string
      }
      instance: Sequelize
    }
  }
  models: {
    [key: string]: WertikModule["tableInstance"]
  }
  mailer: iObject
  graphql: iObject
  sockets: iObject
  cronJobs: iObject
  storage: iObject
  queue: any
  httpServer?: any
  express?: any
  redis: iObject
  logger: any
}

/**
 * Provide same options that redis createClient method requires.
 */
export interface useRedisProps {
  [key: string]: any
  name: string
}

export interface useMailerProps {
  /**
   * Provide name for your mailer.
   */
  name: string
  /**
   * Provide options that you provide procide to nodemailer.createTransport function.
   */
  options?: {
    [key: string]: any
  }
}
