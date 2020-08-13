"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser")); //解析请求体
var cookie_session_1 = __importDefault(require("cookie-session")); //存储登陆状态
require("./controller/loginController");
require("./controller/crowllerController");
var router_1 = __importDefault(require("./router"));
var app = express_1.default();
//bodyParser中间件解析请求体
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['lxr'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(router_1.default);
app.listen(7002, function () {
    console.log('server is running');
});
