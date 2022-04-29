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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useReducer, useContext, useEffect, useMemo } from "react";
import { ActionType } from "./ActionType";
export function createStore(classConstructor) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var container = null;
    var postContainer = function () {
        if (!container) {
            var inst = new (classConstructor.bind.apply(classConstructor, __spreadArray([void 0], args, false)))();
            container = {
                inst: inst,
                Context: React.createContext(inst),
            };
        }
        return container;
    };
    var initialize = function (_state) {
        if (!container) {
            return postContainer().inst;
        }
        else {
            var newInst = new (classConstructor.bind.apply(classConstructor, __spreadArray([void 0], args, false)))();
            for (var _i = 0, _a = Object.entries(newInst); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (typeof value === "function" || key === "dispatch")
                    continue;
                container.inst[key] = value;
            }
        }
        return container.inst;
    };
    var reducer = function (state, action) {
        switch (action.type) {
            case ActionType.Bound:
                return __assign({}, action.payload); // payload is inst, as "this"
            case ActionType.Reset:
                return initialize(state);
        }
    };
    var Provider = function (props) {
        var local = useMemo(function () { return postContainer(); }, []);
        var _a = useReducer(reducer, local.inst), state = _a[0], dispatcher = _a[1];
        useEffect(function () {
            // dispatch is private, so inst is cast to any to get around it
            local.inst.dispatch = dispatcher;
            return function () {
                if (container) {
                    container.inst.dispatch = null;
                    container = null;
                }
            };
            // eslint-disable-next-line
        }, []);
        return React.createElement(local.Context.Provider, { value: state }, props.children);
    };
    // Public Context
    var ContextHook = function () { return useContext(postContainer().Context); };
    // Public getter
    var getInstance = function () {
        if (!container) {
            throw new Error("Store getter for ".concat(classConstructor.name, " called outside of its context."));
        }
        return container.inst;
    };
    return [Provider, ContextHook, getInstance];
}
//# sourceMappingURL=CreateStore.js.map