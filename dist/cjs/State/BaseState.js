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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.BaseState = void 0;
require("reflect-metadata");
var ActionType_1 = require("./ActionType");
var BaseState = /** @class */ (function () {
    function BaseState() {
        var _this = this;
        this.dispatch = null;
        this.deferredDispatches = [];
        this.setDispatcher = function (dispatcher) {
            _this.dispatch = dispatcher;
        };
        this.reset = function () {
            var isServer = typeof window === "undefined";
            if (isServer)
                return;
            if (_this.dispatch === null) {
                return;
            }
            _this.dispatch({
                type: ActionType_1.ActionType.Reset,
            });
        };
        this.dispatchStateInternal = function (payload) {
            var isServer = typeof window === "undefined";
            if (isServer)
                return;
            if (_this.dispatch === null) {
                // typically just errors during a react rebuild
                _this.deferredDispatches.push(payload);
                return;
            }
            if (_this.deferredDispatches.length > 0) {
                var updates = {};
                while (_this.deferredDispatches.length > 0) {
                    var data = _this.deferredDispatches.shift();
                    console.log(data);
                    updates = __assign(__assign({}, updates), data);
                }
                payload = __assign(__assign({}, updates), payload);
                console.log("deferredPayload: ", payload, updates);
            }
            _this.dispatch({
                type: ActionType_1.ActionType.Bound,
                payload: payload,
            });
        };
        this.dispatchStoreState = function () { return _this.dispatchStateInternal(_this); };
    }
    return BaseState;
}());
exports.BaseState = BaseState;
function Action(target, key, descriptor) {
    if (!descriptor) {
        throw new Error("@Action: descriptor was not found");
    }
    if (descriptor && descriptor.value === undefined && descriptor.initializer === undefined) {
        throw new Error("@Action decorator can only be applied to arrow functions (for now)");
    }
    var initializer = descriptor === null || descriptor === void 0 ? void 0 : descriptor.initializer;
    if (initializer) {
        if (typeof initializer !== "function") {
            throw new TypeError("@Action decorator can only be applied to arrow functions, not " + typeof initializer);
        }
        return {
            enumerable: true,
            configurable: true,
            writable: true,
            initializer: function () {
                var _this = this;
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (!initializer) {
                        console.log("@Action: no initializer");
                        return;
                    }
                    var method = initializer.call(_this);
                    var result = method.apply(_this, args);
                    if (result && typeof result.finally === "function") {
                        return result.finally(function () { return _this.dispatchStateInternal(_this); });
                    }
                    _this.dispatchStateInternal(_this);
                    return result;
                };
            },
        };
    }
    else {
        var value = target[key];
        if (value && typeof value !== "function") {
            throw new TypeError("@Action decorator can only be applied to arrow functions, not " + typeof value);
        }
        var func_1;
        var patchedFunc_1;
        if (descriptor) {
            func_1 = descriptor.value;
        }
        return {
            enumerable: false,
            configurable: true,
            set: function (method) {
                console.log(key + ": " + method);
                patchedFunc_1 = undefined;
                func_1 = method;
            },
            get: function () {
                var _this = this;
                if (!patchedFunc_1) {
                    patchedFunc_1 = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (!func_1) {
                            console.log("@Action: no initializer");
                            return;
                        }
                        var result = func_1.call.apply(func_1, __spreadArrays([_this], args));
                        if (result && typeof result.finally === "function") {
                            return result.finally(function () { return _this.dispatchStateInternal(_this); });
                        }
                        _this.dispatchStateInternal(_this);
                        return result;
                    };
                }
                return patchedFunc_1;
            },
        };
    }
}
exports.Action = Action;
//# sourceMappingURL=BaseState.js.map