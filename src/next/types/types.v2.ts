import { ApolloServer } from "apollo-server-express";
import { Sequelize } from "sequelize/types";
import { useDatabaseProps, WertikDatabase } from "./types";

export type iObject = { [key: string]: any };

export interface ModuleProps {
  name: string;
  useDatabase: false;
  table: string;
  database: string;
}

export interface Store {
  graphql: {
    typeDefs: String;
    resolvers: {
      Query: {
        [key: string]: Function;
      };
      Mutation: {
        [key: string]: Function;
      };
    };
  };
  database: {
    relationships: Array<iObject>;
  };
}

export interface useStorageProps {
  for: "dropbox" | "digitalocean";
  dropboxOptions?: {
    accessToken: string;
  };
  digitalOceanOptions?: {
    accessKeyId: string;
    secretAccessKey: string;
    spacesEndpoint: string;
  };
}

export interface UseDatabaseProps {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
  options?: iObject;
}

export interface WertikConfiguration {
  port: number;
  express?: any;
  httpServer?: iObject;
  skip?: boolean;
  database?: {
    [key: string]: () => Promise<{
      credentials: UseDatabaseProps;
      instance: Sequelize;
    }>;
  };
  modules?: {
    [key: string]: ({
      store: Store,
      configuration: WertikConfiguration,
      app: WertikApp,
    }) => iObject;
  };
  storage?: {
    [key: string]: (props: useStorageProps) => ({
      configuration: WertikConfiguration,
      app: WertikApp,
    }) => {
      spacesEndpoint?: iObject;
      s3?: iObject;
      dropbox?: iObject;
    };
  };
  mailer?: {
    [key: string]: () => Promise<unknown>;
  };
  sockets?: {
    [key: string]: () => ({
      configuration: WertikConfiguration,
      app: WertikApp,
    }) => iObject;
  };
  graphql?: ({
    store: Store,
    wertikApp: WertikApp,
    configuration: WertikConfiguration,
  }) => iObject;
  cronJobs?: (prop: useCronJobsProps) => () => iObject;
}

export interface useCronJobsProps {
  expression: string;
  beforeRun: (app: WertikApp) => void | any;
  afterRun: (app: WertikApp) => void | any;
  handler: (app: WertikApp) => void | any;
}

export interface emailSendProps {
  template: string;
  variables: {
    [key: string]: any;
  };
  from: string;
  to: string;
  subject: string;
  [key: string]: any;
}

export interface useGraphqlProps {
  options?: {
    [key: string]: any;
  };
  resolvers?: {
    Mutation: {};
    Query: {};
  };
  typeDefs?: string;
}

export interface userMailerProps {}

export interface WertikApp {
  sendEmail?: (
    app: WertikApp
  ) => ({ mailer: string, options: emailSendProps }) => iObject;
  [key: string]: any;
}

export interface GraphqlInitializeProps {
  wertikApp: WertikApp;
  store: Store;
  configuration: WertikConfiguration;
  expressApp: any;
}
