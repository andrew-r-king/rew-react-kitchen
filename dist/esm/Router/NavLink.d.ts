import React from "react";
import { NavLinkProps } from "react-router-dom";
declare type PropsNL = Omit<NavLinkProps, "end"> & {
    activeStyle?: React.CSSProperties;
    label?: string;
    exact?: boolean;
};
declare const NavLink: ({ children, label, exact, activeClassName, ...props }: PropsNL) => JSX.Element;
export { NavLink };
