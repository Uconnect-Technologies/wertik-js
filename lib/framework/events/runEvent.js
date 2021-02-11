"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(events) {
    return function (name, args) {
        if (events.hasOwnProperty(name)) {
            events[name](args);
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=runEvent.js.map