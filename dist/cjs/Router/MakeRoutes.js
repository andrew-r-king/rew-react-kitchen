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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMatch = exports.useParams = exports.useLocation = exports.useNavigate = exports.Navigate = exports.makeRoutes = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
Object.defineProperty(exports, "Navigate", { enumerable: true, get: function () { return react_router_dom_1.Navigate; } });
Object.defineProperty(exports, "useNavigate", { enumerable: true, get: function () { return react_router_dom_1.useNavigate; } });
Object.defineProperty(exports, "useLocation", { enumerable: true, get: function () { return react_router_dom_1.useLocation; } });
Object.defineProperty(exports, "useParams", { enumerable: true, get: function () { return react_router_dom_1.useParams; } });
Object.defineProperty(exports, "useMatch", { enumerable: true, get: function () { return react_router_dom_1.useMatch; } });
var makeRoutes = function (inRoutes, HomeComponent, NotFoundComponent, routerOptions) {
    if (HomeComponent === void 0) { HomeComponent = null; }
    if (NotFoundComponent === void 0) { NotFoundComponent = null; }
    if (routerOptions === void 0) { routerOptions = {}; }
    if (!!HomeComponent) {
        inRoutes.push({
            path: "/",
            element: react_1.default.createElement(HomeComponent, null),
        });
    }
    if (!!NotFoundComponent) {
        inRoutes.push({
            path: "*",
            element: react_1.default.createElement(NotFoundComponent, null),
        });
    }
    else {
        inRoutes.push({
            path: "*",
            redirectTo: "/",
        });
    }
    var outRoutes = inRoutes.map(function (_a) {
        var redirectTo = _a.redirectTo, route = __rest(_a, ["redirectTo"]);
        if (!!redirectTo) {
            return __assign(__assign({}, route), { element: react_1.default.createElement(react_router_dom_1.Navigate, { to: redirectTo, replace: true }) });
        }
        return route;
    });
    var Routes = react_1.default.memo(function () {
        var element = react_router_dom_1.useRoutes(outRoutes);
        return element;
    });
    return react_1.default.memo(function () { return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, { basename: routerOptions.baseName },
            react_1.default.createElement(Routes, null)))); });
};
exports.makeRoutes = makeRoutes;
//# sourceMappingURL=MakeRoutes.js.map