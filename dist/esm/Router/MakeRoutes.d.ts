import React from "react";
import { Navigate, useNavigate, useLocation, useParams, useMatch } from "react-router-dom";
import { Optional } from "Types";
declare type ComponentType = React.ComponentType<any>;
export declare type RoutePropsNormal = {
    caseSensitive?: boolean;
    children?: RouteProps[];
    element?: React.ReactNode;
    path?: string;
};
export declare type RoutePropsRedirect = {
    redirectTo?: string;
    path?: string;
};
export declare type RouteProps = RoutePropsNormal | RoutePropsRedirect;
export declare type RouterOptions = {
    baseName?: string;
};
declare const makeRoutes: (inRoutes: RouteProps[], HomeComponent?: Optional<ComponentType>, NotFoundComponent?: Optional<ComponentType>, routerOptions?: RouterOptions) => React.MemoExoticComponent<() => JSX.Element>;
export { makeRoutes, Navigate, useNavigate, useLocation, useParams, useMatch };
