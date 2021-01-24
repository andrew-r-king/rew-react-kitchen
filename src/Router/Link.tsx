import React from "react";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

type Props = LinkProps & {
	label?: string;
};

const Link = ({ children, label, ...props }: Props) => {
	return <ReactRouterLink {...props}>{label ?? children}</ReactRouterLink>;
};

export { Link };
