"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
//格式化response
var getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data
        };
    }
    else {
        return {
            success: true,
            data: data
        };
    }
};
exports.getResponseData = getResponseData;
