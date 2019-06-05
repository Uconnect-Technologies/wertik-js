System.register(["./../../../framework/graphql/getListByPaginationAndFiltersSchema"], function (exports_1, context_1) {
    "use strict";
    var getListByPaginationAndFiltersSchema_1, userFields;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getListByPaginationAndFiltersSchema_1_1) {
                getListByPaginationAndFiltersSchema_1 = getListByPaginationAndFiltersSchema_1_1;
            }
        ],
        execute: function () {
            userFields = "\n\t_id: String\n\tid: Int\n\tname: String\n\tage: Int\n\tusername: String\n\trefreshToken: String\n\taccessToken: String\n\tisActivated: Boolean\n\tactivatedOn: String\n\ttwoFactorCode: String\n\tisSuperUser: Boolean\n\tactivationToken: String\n\temail: String\n\tpassword: String\n\tgender: String\n\treferer: String\n";
            exports_1("default", "\n\ttype User {\n\t\t" + userFields + "\n\t\tprofile: Profile\n\t\tassignedPermissions: [UserPermissionList]\n\t\tassignedRoles: [UserRoleList]\n\t\tsuccessMessage: String\n\t\tsuccessMessageType: String\n\t\tcreated_at: String\n\t\tupdated_at: String\n\t}\n\t" + getListByPaginationAndFiltersSchema_1["default"]("User") + "\n\tinput UserInput {\n\t\t" + userFields + "\n\t}\n\tinput UserSignupInput {\n\t\temail: String\n\t\tpassword: String\n\t\tconfirmPassword: String\n\t}\n");
        }
    };
});
//# sourceMappingURL=schema.js.map