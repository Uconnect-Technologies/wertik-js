System.register(["./../../../framework/graphql/getListByPaginationAndFiltersSchema"], function (exports_1, context_1) {
    "use strict";
    var getListByPaginationAndFiltersSchema_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getListByPaginationAndFiltersSchema_1_1) {
                getListByPaginationAndFiltersSchema_1 = getListByPaginationAndFiltersSchema_1_1;
            }
        ],
        execute: function () {
            exports_1("default", "\n\ttype Role {\n\t\t_id: String\n\t\tid: Int\n\t\tname: String\n\t\tsuccessMessage: String\n\t\tsuccessMessageType: String\n\t\tpermissions: [RolePermissionList]\n\t\tcreated_by: User\n\t\tcreated_at: String\n\t\tupdated_at: String\n\t}\n\n\t" + getListByPaginationAndFiltersSchema_1["default"]("Role") + "\n\n\tinput RoleInput {\n\t\t_id: String\n\t\tid: Int\n\t\tname: String\n\t}\n\t\n");
        }
    };
});
//# sourceMappingURL=schema.js.map