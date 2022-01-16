import React from "react";
import { NavLink as ReactRouterNavLink, NavLinkProps } from "react-router-dom";

type Props = Omit<NavLinkProps, "end"> & {
	activeStyle?: React.CSSProperties;
	activeClassName?: string;
	label?: string;
	exact?: boolean;
};

const NavLink = ({ children, label, exact, activeClassName, ...props }: Props) => {
	return (
		<ReactRouterNavLink
			{...props}
			end={!!exact}
			className={(data) => (!!data.isActive && !!activeClassName ? "is-active" : "")}
		>
			{label ?? children}
		</ReactRouterNavLink>
	);
};

export { NavLink };
