"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                router_1.default[method](path, middleware, handler);
            }
            else {
                router_1.default[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
