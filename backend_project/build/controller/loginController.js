"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.loginStatus = function (req, res) {
        var isLogin = !!(req.session ? req.session.login : false);
        res.json(util_1.getResponseData(isLogin));
    };
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = !!(req.session ? req.session.login : false);
        if (isLogin) {
            res.json(util_1.getResponseData(true));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json(util_1.getResponseData(true));
            }
            else {
                res.json(util_1.getResponseData(false, '登陆失败'));
            }
        }
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
            res.json(util_1.getResponseData(true));
        }
    };
    __decorate([
        index_1.get('/api/loginStatus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "loginStatus", null);
    __decorate([
        index_1.post('/api/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        index_1.get('/api/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = __decorate([
        index_1.controller
    ], LoginController);
    return LoginController;
}());
