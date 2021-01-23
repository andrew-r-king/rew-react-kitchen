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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouteMatch = exports.useParams = exports.useLocation = exports.useHistory = exports.makeRoutes = void 0;
var react_1 = __importDefault(require("react"));
var history_1 = require("history");
var react_router_dom_1 = require("react-router-dom");
Object.defineProperty(exports, "useHistory", { enumerable: true, get: function () { return react_router_dom_1.useHistory; } });
Object.defineProperty(exports, "useLocation", { enumerable: true, get: function () { return react_router_dom_1.useLocation; } });
Object.defineProperty(exports, "useParams", { enumerable: true, get: function () { return react_router_dom_1.useParams; } });
Object.defineProperty(exports, "useRouteMatch", { enumerable: true, get: function () { return react_router_dom_1.useRouteMatch; } });
function makeRoutes(inRoutes, homeComponent, notFoundComponent) {
    return function () {
        var routemap = react_1.default.useMemo(function () {
            var outRoutes = __spreadArrays(inRoutes, [
                {
                    path: "/(.+)",
                    component: notFoundComponent,
                },
                {
                    path: "/",
                    component: homeComponent,
                },
            ]);
            return outRoutes.map(function (route, i) {
                return react_1.default.createElement(react_router_dom_1.Route, __assign({ key: i }, route));
            });
        }, []);
        var history = react_1.default.useMemo(function () { return history_1.createBrowserHistory(); }, []);
        return (react_1.default.createElement(react_router_dom_1.Router, { history: history },
            react_1.default.createElement(react_router_dom_1.Switch, null, routemap)));
    };
}
exports.makeRoutes = makeRoutes;
//# sourceMappingURL=MakeRoutes.js.map