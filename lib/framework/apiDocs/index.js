"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../helpers/index");
const docFileSource = process.env['generateDocumentationPath'];
// const docFileSource = "asd";
exports.addContentsToDoc = function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(() => {
            doc = doc.replace("first________", "/**");
            doc = doc.replace("last________", "*/");
            index_1.appendToFileSync(docFileSource, doc);
        }, 600);
    });
};
exports.resetDocFile = function () {
    return __awaiter(this, void 0, void 0, function* () {
        exports.deleteDocFile(function () {
            index_1.createEmptyFile(docFileSource, function () {
                exports.addContentsToDoc("//empty file");
            });
        });
    });
};
exports.deleteDocFile = function (cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (index_1.exists(docFileSource)) {
            index_1.deleteFile(docFileSource, cb);
        }
        else {
            cb();
        }
    });
};
//# sourceMappingURL=index.js.map