"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { get } = require("lodash");
let gql = require('graphql-tag');
function default_1(query) {
    let parsed = gql `${query}`;
    let queryName = get(parsed, "definitions[0].selectionSet.selections[0].name.value", '');
    let auth = [
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
exports.default = default_1;
//# sourceMappingURL=isAuthQuery.js.map