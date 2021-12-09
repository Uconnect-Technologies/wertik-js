export interface IPermission {
  id: Number
  name: String
  can: String
  cant: String
}

export interface IRole {
  name: String
  defaultPermissions: String
}

export interface IUser {
  id: Number
  name: String
  username: String
  refreshToken: String
  accessToken: String
  isActivated: Boolean
  activatedOn: String
  twoFactorCode: String
  isSuperUser: Boolean
  activationToken: String
  email: String
  gender: String
  referer: String
}

export interface IRolePermission {
  id: Number
  role: any
  permission: any
}

export interface IUserPermission {
  id: Number
  user: any
  permission: any
}

export interface IModelHandlerFunctionProps {
  mode: string
  req: any
}
