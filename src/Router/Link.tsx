import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

type Props = NavLinkProps &
	React.RefAttributes<HTMLAnchorElement> & {
		activeStyle?: React.CSSProperties;
		label?: string;
	};

const Link = ({ children, label, ...props }: Props) => {
	return <NavLink {...props}>{label ?? children}</NavLink>;
};

export { Link };
