import { httpstatus } from "aws-sdk/clients/glacier";
import { Express } from "express";
import { Server } from "http";
import { Model, Sequelize } from "sequelize/types";

export interface NextConfigurationProps {
  port?: number;
  skip?: any;
  express?: any;
  database?: {
    [key: string]: (props: useDatabaseProps) => Function;
  };
  modules?: {
    [key: string]: (props: useModuleProps) => Function;
  };
  cronJobs?: any;
  sockets?: {
    [key: string]: (props: any) => Function;
  };
  graphql?: (props: useGraphqlProps) => { [key: string]: any };
  email?: {
    [key: string]: (props: useMailerProps) => Function;
  };
  storage?: any;
}

export interface WertikApp {
  express?: Express;
  httpServer?: Server;
  port?: number | string;
  skip: boolean;
  email: {};
  database: {
    [key: string]: WertikDatabase;
  };
  graphql: {};
  modules: { [key: string]: WertikModule };
  storage: {
    [key: string]: WertikStorage;
  };
}
export interface WertikDatabase {
  credentials: WertikDatabaseCredentials;
  instance: Sequelize;
}
export interface WertikModule {
  tableInstance: Model;
}
export interface WertikDatabaseCredentials {
  port: number;
  password: string;
  username: string;
  host: string;
  name: string;
}
export interface WertikStorage {}
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
export interface useCronJobsProps {}
export interface useMailerProps {}
export interface useIndependentWebSocketsServerProps {}
export interface useWebSocketsProps {}
export interface useSocketIOProps {}
export interface useDatabaseProps {
  name: string;
  username: string;
  password: string;
  host: number;
  options: {
    [key: string]: any;
  };
}

export interface useModuleProps {
  name: string;
  useDatabase: boolean;
  table?: string;
  database?: string;
  tableOptions?: any;
  graphql?: {
    schema?: string;
  };
  on?: (obj: {
    useQuery: (props: useQueryProps) => {} | void;
    useMutation: (props: useMutationProps) => {} | void;
    useExpress: (props: useExpressProps) => {} | void;
    hasOne: (props: RelationParams) => {} | void;
    belongsTo: (props: RelationParams) => {} | void;
    belongsToMany: (props: RelationParams) => {} | void;
    hasMany: (props: RelationParams) => {} | void;
    useSchema: (props: useSchemaProps) => {} | void;
  }) => void;
  events?: {
    beforeView?: Function;
    beforeCount?: Function;
    beforeList?: Function;
    beforeCreate?: Function;
    beforeDelete?: Function;
    beforeUpdate?: Function;
  };
}
export interface useQueryProps {
  query: string;
  resolver: Function;
  name: string;
}
export interface useMutationProps {
  query: string;
  resolver: Function;
  name: string;
}
export type useExpressProps = Function;
export interface RelationParams {
  module: string;
  graphqlKey: string;
  database: string;
  options: {
    [key: string]: string | number | null;
  };
}
export type useSchemaProps = string;
