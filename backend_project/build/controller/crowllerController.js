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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var crowller_1 = __importDefault(require("../utils/crowller"));
var analyzer_1 = __importDefault(require("../analyzer"));
//登陆校验中间件
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登陆'));
    }
};
var crowllercontroller = /** @class */ (function () {
    function crowllercontroller() {
    }
    crowllercontroller.prototype.getData = function (req, res) {
        var url = 'https://www.jianshu.com/';
        var analyzer = new analyzer_1.default();
        new crowller_1.default(url, analyzer);
        // res.json(getResponseData('数据获取成功'))
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/jianshu.json');
            var result = fs_1.default.readFileSync(filePath, 'utf-8');
            res.json(util_1.getResponseData(JSON.parse(result)));
        }
        catch (e) {
            res.json(util_1.getResponseData('数据不存在'));
        }
    };
    __decorate([
        decorator_1.get('/api/getData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], crowllercontroller.prototype, "getData", null);
    crowllercontroller = __decorate([
        decorator_1.controller
    ], crowllercontroller);
    return crowllercontroller;
}());
