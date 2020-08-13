"use strict";
//爬简书四张图片
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio")); //分析html文件
var jianshuAnalyzer = /** @class */ (function () {
    function jianshuAnalyzer() {
    }
    jianshuAnalyzer.prototype.getBoardJson = function (html) {
        var $ = cheerio_1.default.load(html);
        var BoardItems = $('.board a img');
        var jsonInfo = [];
        BoardItems.map(function (index, ele) {
            jsonInfo.push({ imgUrl: ele.attribs.src });
        });
        return {
            time: new Date().getTime(),
            data: jsonInfo
        };
    };
    jianshuAnalyzer.prototype.getAllJson = function (html, filePath) {
        var infoItem = this.getBoardJson(html);
        var allJson = {};
        if (fs_1.default.existsSync(filePath)) {
            allJson = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        allJson[infoItem.time] = infoItem.data;
        return JSON.stringify(allJson);
    };
    jianshuAnalyzer.prototype.analyze = function (html, filePath) {
        var jsonInfoResult = this.getAllJson(html, filePath);
        return jsonInfoResult;
    };
    return jianshuAnalyzer;
}());
exports.default = jianshuAnalyzer;
