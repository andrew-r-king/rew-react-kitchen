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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
var react_1 = __importStar(require("react"));
var ActionType_1 = require("./ActionType");
function createStore(classConstructor) {
    var inst = new classConstructor();
    var InternalContext = react_1.default.createContext(inst);
    var initialize = function (_state) {
        inst = new classConstructor();
        return inst;
    };
    var reducer = function (state, action) {
        switch (action.type) {
            case ActionType_1.ActionType.Bound:
                return __assign({}, action.payload); // payload is inst, as "this"
            case ActionType_1.ActionType.Reset:
                return initialize(state);
        }
    };
    var Provider = function (props) {
        var _a = (0, react_1.useReducer)(reducer, inst), state = _a[0], dispatcher = _a[1];
        (0, react_1.useEffect)(function () {
            // setDispatcher is private, so inst is cast to any to get around it
            inst.setDispatcher(dispatcher);
            return function () {
                inst.setDispatcher(null);
            };
            // eslint-disable-next-line
        }, []);
        return react_1.default.createElement(InternalContext.Provider, { value: state }, props.children);
    };
    var Context = function () { return (0, react_1.useContext)(InternalContext); };
    return [Provider, Context, inst];
}
exports.createStore = createStore;
//# sourceMappingURL=CreateStore.js.map