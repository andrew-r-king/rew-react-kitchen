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
import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, useHistory, useLocation, useParams, useRouteMatch, } from "react-router-dom";
function makeRoutes(inRoutes, homeComponent, notFoundComponent) {
    return function () {
        var routemap = React.useMemo(function () {
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
                return React.createElement(Route, __assign({ key: i }, route));
            });
        }, []);
        var history = React.useMemo(function () { return createBrowserHistory(); }, []);
        return (React.createElement(Router, { history: history },
            React.createElement(Switch, null, routemap)));
    };
}
export { makeRoutes, useHistory, useLocation, useParams, useRouteMatch };
//# sourceMappingURL=MakeRoutes.js.map