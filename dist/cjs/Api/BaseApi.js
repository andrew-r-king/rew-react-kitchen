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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApi = void 0;
var axios_1 = __importDefault(require("axios"));
var logError = function (err, source) {
    if (axios_1.default.isCancel(err)) {
        source.cancel("Request canceled");
    }
    else {
        // console.error(err);
    }
};
var validateForwardSlash = function (route) {
    if (!route.startsWith("/"))
        throw new Error("Route '" + route + "' must start with '/'");
};
var BaseApi = /** @class */ (function () {
    function BaseApi(baseUrl, config) {
        var _this = this;
        this.baseUrl = baseUrl;
        this.contentType = "application/json";
        this.config = {};
        this.getRequestConfig = function (source) {
            var _a;
            // TODO: Potential for header customization
            // TODO: Also, general authentication
            return __assign({ headers: __assign({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", "Content-Type": _this.contentType }, (_a = _this.config) === null || _a === void 0 ? void 0 : _a.headers), cancelToken: source.token }, _this.config);
        };
        this.setConfig = function (config) {
            _this.config = config;
        };
        this.OPTIONS = function (route) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.options(this.baseUrl + route, requestConfig)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_1 = _a.sent();
                        logError(err_1, source);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.GET = function (route) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.get(this.baseUrl + route, requestConfig)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                    case 3:
                        err_2 = _a.sent();
                        logError(err_2, source);
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.HEAD = function (route) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.head(this.baseUrl + route, requestConfig)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.headers];
                    case 3:
                        err_3 = _a.sent();
                        logError(err_3, source);
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.POST = function (route, data) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.post(this.baseUrl + route, data, requestConfig)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                    case 3:
                        err_4 = _a.sent();
                        logError(err_4, source);
                        throw err_4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.PUT = function (route, data) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, created, modified, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.put(this.baseUrl + route, data, requestConfig)];
                    case 2:
                        result = _a.sent();
                        created = result.status === 201;
                        modified = result.status === 200 || result.status === 204;
                        if (!created && !modified) {
                            throw new Error("Invalid or unexpected response status from PUT '" + route + "': received " + result.status + " (" + result.statusText + ")");
                        }
                        return [2 /*return*/, result];
                    case 3:
                        err_5 = _a.sent();
                        logError(err_5, source);
                        throw err_5;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.PATCH = function (route, data) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, validStatusCode, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.patch(this.baseUrl + route, data, requestConfig)];
                    case 2:
                        result = _a.sent();
                        validStatusCode = result.status >= 200 && result.status < 300;
                        if (!validStatusCode) {
                            throw new Error("Invalid or unexpected response status from PATCH '" + route + "': received " + result.status + " (" + result.statusText + ")");
                        }
                        return [2 /*return*/, result.data];
                    case 3:
                        err_6 = _a.sent();
                        logError(err_6, source);
                        throw err_6;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.DELETE = function (route) { return __awaiter(_this, void 0, void 0, function () {
            var source, requestConfig, result, noContent, validStatusCode, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = axios_1.default.CancelToken.source();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        validateForwardSlash(route);
                        requestConfig = this.getRequestConfig(source);
                        return [4 /*yield*/, this.axios.delete(this.baseUrl + route, requestConfig)];
                    case 2:
                        result = _a.sent();
                        noContent = result.status === 204;
                        validStatusCode = result.status === 200 || result.status === 202;
                        if (!noContent && !validStatusCode) {
                            throw new Error("Invalid or unexpected response status from DELETE '" + route + "': received " + result.status + " (" + result.statusText + ")");
                        }
                        return [2 /*return*/, !noContent && validStatusCode];
                    case 3:
                        err_7 = _a.sent();
                        logError(err_7, source);
                        throw err_7;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (config) {
            this.axios = axios_1.default.create(config);
        }
        else {
            this.axios = axios_1.default;
        }
    }
    return BaseApi;
}());
exports.BaseApi = BaseApi;
//# sourceMappingURL=BaseApi.js.map