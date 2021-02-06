import React from "react";
import {
	BrowserRouter,
	Routes as RouterRoutes,
	Navigate,
	useNavigate,
	useLocation,
	useParams,
	useMatch,
	useRoutes,
} from "react-router-dom";
import { Optional } from "Types";

type ComponentType = React.ComponentType<any>;

export type RoutePropsNormal = {
	caseSensitive?: boolean;
	children?: RouteProps[];
	element?: React.ReactNode;
	path?: string;
};

export type RoutePropsRedirect = {
	redirectTo?: string;
	path?: string;
};

export type RouteProps = RoutePropsNormal | RoutePropsRedirect;

export type RouterOptions = {
	baseName?: string;
};

const makeRoutes = (
	inRoutes: RouteProps[],
	HomeComponent: Optional<ComponentType> = null,
	NotFoundComponent: Optional<ComponentType> = null,
	routerOptions: RouterOptions = {}
) => {
	if (!!HomeComponent) {
		inRoutes.push({
			path: "/",
			element: <HomeComponent />,
		});
	}

	if (!!NotFoundComponent) {
		inRoutes.push({
			path: "*",
			element: <NotFoundComponent />,
		});
	} else {
		inRoutes.push({
			path: "*",
			redirectTo: "/",
		});
	}

	const outRoutes: RoutePropsNormal[] = (inRoutes as (RoutePropsNormal & RoutePropsRedirect)[]).map(
		({ redirectTo, ...route }) => {
			if (!!redirectTo) {
				return {
					...route,
					element: <Navigate to={redirectTo} replace />,
				};
			}
			return route;
		}
	);

	const Routes = React.memo(() => {
		const element = useRoutes(outRoutes, routerOptions.baseName);
		return element;
	});

	return React.memo(() => (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	));
};

export { makeRoutes, Navigate, useNavigate, useLocation, useParams, useMatch };
