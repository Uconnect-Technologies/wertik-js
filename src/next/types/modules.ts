import { iObject } from "."

export interface useQueryProps {
  /**
   * Schema for this query, for example: getUsers: [Users]
   */
  query: string
  /**
   * Resolver method for this query.
   */
  resolver: Function
  /**
   * Add a name to your query for example: getUsers
   */
  name: string
}
export interface useMutationProps {
  /**
   * Schema for this query, for example: deleteUsers: Boolean
   */
  query: string
  /**
   * Resolver method for this mutation.
   */
  resolver: Function
  /**
   * Add a name to your mutation for example: deleteUsers
   */
  name: string
}
export type useExpressProps = Function
export interface RelationParams {
  module: string
  graphqlKey: string
  database: string
  options?: {
    [key: string]: string | number | null
  }
}
export type useSchemaProps = string

export interface useModuleProps {
  /**
   * Your module name.
   */
  name: string
  /**
   * Are you using a database connection to this module? If yes, you will need to provide a database and table.
   */
  useDatabase: boolean
  /**
   * Database table name.
   */
  table?: string
  /**
   * Database name.
   */
  database?: string

  /**
   * Sequelize Table Options
   */
  tableOptions?: iObject
  /**
   * Graphql options for this module.
   */
  graphql?: {
    /**
     * Wertik-js creates schema by default from the database table. Once you defined this Wertik-js will ignore taking schema from the database.
     */
    schema?: string
    /**
     * Wertik-js creates an update schema from the database table. Once defined, Wertik JS will ignore creating an update schema from table information.
     */
    updateSchema?: string
    /**
     * Wertik-js creates create a schema from the database table. Once defined this, Wertik JS will ignore creating create a schema from the table information.
     */
    createSchema: string
    mutations?: {
      /**
       * Overrides default behavior of updating a record from the database table.
       */
      update?: Function
      /**
       * Overrides default behavior of deleting a record from the database table.
       */
      delete?: Function
      /**
       * Overrides default behavior of create a record from the database table.
       */
      create?: Function
      /**
       * Overrides default behavior of creating or updating a record from the database table.
       */
      createOrUpdate?: Function
    }
  }
  /**
   * on method helps you add functionality to your module, Like adding relationships, queries, mutations, adding schema.
   */
  on?: (obj: {
    /**
     * This Method allows you adding graphql query to your module.
     */
    useQuery: (props: useQueryProps) => {} | void
    /**
     * This Method allows you adding graphql mutation to your module.
     */
    useMutation: (props: useMutationProps) => {} | void
    /**
     * This method gives you access to express app instance.
     */
    useExpress: (express: any) => void
    /**
     * This method adds a one-to-one relationship to a module.
     */
    hasOne: (props: RelationParams) => {} | void
    /**
     * This method adds belongs to relationship to a module.
     */
    belongsTo: (props: RelationParams) => {} | void
    /**
     * This method adds one to many relationship to a module.
     */
    belongsToMany: (props: RelationParams) => {} | void
    /**
     * This method adds belogs to many relationship to a module.
     */
    hasMany: (props: RelationParams) => {} | void
    /**
     * This method adds has many relationship to a module.
     */
    useSchema: (props: useSchemaProps) => {} | void
  }) => void
  /**
   * Graphql events when a CRUD opreation happens.
   */
  events?: {
    /**
     * This events runs before beforeView query.
     */
    beforeView?: Function
    /**
     * This events runs before beforeCount query.
     */
    beforeCount?: Function
    /**
     * This events runs before beforeList query.
     */
    beforeList?: Function
    /**
     * This events runs before beforeCreate mutation.
     */
    beforeCreate?: Function
    /**
     * This events runs before beforeDelete mutation.
     */
    beforeDelete?: Function
    /**
     * This events runs before beforeUpdate mutation.
     */
    beforeUpdate?: Function
    /**
     * This events runs before beforeCreateOrUpdate mutation.
     */
    beforeCreateOrUpdate?: Function
  }
}
