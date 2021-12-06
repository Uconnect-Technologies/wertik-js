export interface IBuiltinModuleOverride {
  graphql: {
    mutation: {
      create: Function;
      update: Function;
      delete: Function;
      softDelete: Function;
      bulkCreate: Function;
      bulkDelete: Function;
      bulkUpdate: Function;
      save: Function;
    };
    query: {
      list: Function;
      view: Function;
      byId: Function;
    };
  };
  restApi: {
    create: Function;
    update: Function;
    delete: Function;
    bulkCreate: Function;
    bulkDelete: Function;
    bulkUpdate: Function;
    list: Function;
    view: Function;
    save: Function;
  };
}

export interface IBuiltinModuleOverrideAuth {
  graphql: {
    mutation: {
      login: Function;
      signup: Function;
      twoFactorLoginValidate: Function;
      loginWithAccessToken: Function;
      activateAccount: Function;
      refreshToken: Function;
    };
  };
  restApi: {
    login: Function;
    signup: Function;
    twoFactorLoginValidate: Function;
    loginWithAccessToken: Function;
    activateAccount: Function;
    refreshToken: Function;
  };
}

export interface IConfigurationOverride {
  Role: IBuiltinModuleOverride;
  UserPermission: IBuiltinModuleOverride;
  Permission: IBuiltinModuleOverride;
  UserRole: IBuiltinModuleOverride;
  RolePermission: IBuiltinModuleOverride;
  User: IBuiltinModuleOverride;
  Auth: IBuiltinModuleOverrideAuth;
}
