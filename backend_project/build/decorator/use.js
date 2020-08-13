"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleWiare) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleWiare, target, key);
    };
}
exports.use = use;
