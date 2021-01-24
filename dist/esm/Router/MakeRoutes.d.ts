import React from "react";
import { Navigate, useNavigate, useLocation, useParams, useMatch } from "react-router-dom";
declare type ComponentType = React.ComponentType<any>;
export declare type RoutePropsNormal = {
    caseSensitive?: boolean;
    children?: RouteProps[];
    element?: React.ReactNode;
    redirectTo?: string;
    path?: string;
};
export declare type RoutePropsRedirect = {
    redirectTo?: string;
    path?: string;
};
export declare type RouteProps = RoutePropsNormal | RoutePropsRedirect;
declare const makeRoutes: (inRoutes: RouteProps[], HomeComponent?: ComponentType | null, NotFoundComponent?: ComponentType | null) => React.MemoExoticComponent<() => JSX.Element>;
export { makeRoutes, Navigate, useNavigate, useLocation, useParams, useMatch };
