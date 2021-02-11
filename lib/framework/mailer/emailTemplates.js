"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const index_1 = require("./../helpers/index");
function default_1(configuration, rootPath) {
    let allEmailTemplates = index_1.filesInAFolder(`${__dirname}/email-templates`);
    let templatesObject = {};
    allEmailTemplates.forEach(element => {
        let name = element.split(".")[0];
        let template = require(`./email-templates/${name}`).default;
        templatesObject[name] = template;
    });
    return Object.assign(Object.assign({}, templatesObject), lodash_1.get(configuration, "email.templates", {}));
}
exports.default = default_1;
//# sourceMappingURL=emailTemplates.js.map