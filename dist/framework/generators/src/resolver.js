System.register(["./validations", "./../../../framework/dynamic/index", "./../../../framework/dynamic/allModels"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var validations_1, index_1, allModels_1, gameModel, gameResolver;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (validations_1_1) {
                validations_1 = validations_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (allModels_1_1) {
                allModels_1 = allModels_1_1;
            }
        ],
        execute: function () {
            gameModel = allModels_1["default"].gameModel;
            gameResolver = index_1["default"].resolvers({
                moduleName: 'game',
                validations: {
                    create: validations_1["default"].creategame,
                    "delete": validations_1["default"].deletegame,
                    update: validations_1["default"].updategame,
                    view: validations_1["default"].game
                },
                model: gameModel
            });
            exports_1("default", {
                queries: __assign({}, index_1["default"].loader("game", gameResolver).mutations),
                mutations: __assign({}, index_1["default"].loader("game", gameResolver).mutations)
            });
        }
    };
});
//# sourceMappingURL=resolver.js.map