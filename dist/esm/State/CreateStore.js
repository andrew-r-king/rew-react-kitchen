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
import React, { useReducer, useContext, useEffect } from "react";
import { ActionType } from "./ActionType";
export function createStore(classConstructor) {
    var inst = new classConstructor();
    var InternalContext = React.createContext(inst);
    var initialize = function (_state) {
        inst = new classConstructor();
        return inst;
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
        var _a = useReducer(reducer, inst), state = _a[0], dispatcher = _a[1];
        useEffect(function () {
            // setDispatcher is private, so inst is cast to any to get around it
            inst.setDispatcher(dispatcher);
            return function () {
                inst.setDispatcher(null);
            };
            // eslint-disable-next-line
        }, [inst, dispatcher]);
        return React.createElement(InternalContext.Provider, { value: state }, props.children);
    };
    var Context = function () { return useContext(InternalContext); };
    return [Provider, Context, inst];
}
//# sourceMappingURL=CreateStore.js.map