import React from "react";
import { NavLink as ReactRouterNavLink, NavLinkProps } from "react-router-dom";

type PropsNL = Omit<NavLinkProps, "end"> & {
	activeStyle?: React.CSSProperties;
	label?: string;
	exact?: boolean;
};

const NavLink = ({ children, label, exact, activeClassName, ...props }: PropsNL) => {
	return (
		<ReactRouterNavLink {...props} end={!!exact} activeClassName={activeClassName ?? "is-active"}>
			{label ?? children}
		</ReactRouterNavLink>
	);
};

export { NavLink };
