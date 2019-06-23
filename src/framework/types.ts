export interface IGraphQLInit {
  rootDirectory: String
  app: any
  configuration: Object
}

export interface IGetMongoDBSchemaType {
  type: String
}

export interface IFileExists {
  path: String
}

export interface IRandomString {
  length: Number
  chars: String
}

export interface IConvertConfigurationIntoEnvVariables {
  configuration: Object
  db: Function
}

export interface IGetIdName {
  dialect: String
}

export interface IInternalServerError {
  message: String
}

export interface IValidate {
  args: Object
  schema: Object
}

// security start
export interface ICreateJwtToken {
  data: Object
}

export interface IGetUserWithtokenAndEmail {
  email: String
  password: String
}

export interface IIsActionValid {
  user: Object
  action: String
}
// security ends