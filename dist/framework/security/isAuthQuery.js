System.register([], function (exports_1, context_1) {
    "use strict";
    var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };
    var get, gql, templateObject_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(query) {
        var parsed = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), query);
        var queryName = get(parsed, "definitions[0].selectionSet.selections[0].name.value", '');
        var auth = [
            "signup",
            "resetPassword",
            "requestPasswordResetToken",
            "login",
            "activateAccount",
            "generalAccessToken",
            "twoFactorLogin",
            "twoFactorLoginValidate"
        ];
        return auth.indexOf(queryName) > -1;
        ;
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
            get = require("lodash").get;
            gql = require('graphql-tag');
        }
    };
});
//# sourceMappingURL=isAuthQuery.js.map