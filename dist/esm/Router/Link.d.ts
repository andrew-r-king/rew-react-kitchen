import React from "react";
import { NavLinkProps } from "react-router-dom";
declare type Props = NavLinkProps & React.RefAttributes<HTMLAnchorElement> & {
    activeStyle?: React.CSSProperties;
    label?: string;
};
declare const Link: ({ children, label, ...props }: Props) => JSX.Element;
export { Link };
