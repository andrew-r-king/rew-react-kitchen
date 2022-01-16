import React from "react";
import { NavLinkProps } from "react-router-dom";
declare type Props = Omit<NavLinkProps, "end"> & {
    activeStyle?: React.CSSProperties;
    activeClassName?: string;
    label?: string;
    exact?: boolean;
};
declare const NavLink: ({ children, label, exact, activeClassName, ...props }: Props) => JSX.Element;
export { NavLink };
