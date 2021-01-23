import React from "react";
import { createBrowserHistory } from "history";
import {
	Router,
	Route,
	RouteComponentProps,
	Switch,
	useHistory,
	useLocation,
	useParams,
	useRouteMatch,
	RouteProps as ReactRouterDomRouteProps,
} from "react-router-dom";

type ComponentType = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

export type RouteProps = ReactRouterDomRouteProps;

function makeRoutes(inRoutes: RouteProps[], homeComponent: ComponentType, notFoundComponent: ComponentType) {
	return () => {
		const routemap = React.useMemo(() => {
			const outRoutes = [
				...inRoutes,
				{
					path: "/(.+)",
					component: notFoundComponent,
				},
				{
					path: "/",
					component: homeComponent,
				},
			];

			return outRoutes.map((route, i) => {
				return <Route key={i} {...route} />;
			});
		}, []);

		const history = React.useMemo(() => createBrowserHistory(), []);

		return (
			<Router history={history}>
				<Switch>{routemap}</Switch>
			</Router>
		);
	};
}

export { makeRoutes, useHistory, useLocation, useParams, useRouteMatch };
