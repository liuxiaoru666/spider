"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.post = void 0;
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function createDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.post = createDecorator(Methods.post);
exports.get = createDecorator(Methods.get);
