import React from "react";
import { RouteComponentProps, useHistory, useLocation, useParams, useRouteMatch, RouteProps as ReactRouterDomRouteProps } from "react-router-dom";
declare type ComponentType = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
export declare type RouteProps = ReactRouterDomRouteProps;
declare function makeRoutes(inRoutes: RouteProps[], homeComponent: ComponentType, notFoundComponent: ComponentType): () => JSX.Element;
export { makeRoutes, useHistory, useLocation, useParams, useRouteMatch };
