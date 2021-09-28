/// <reference types="react" />
import { LinkProps } from "react-router-dom";
declare type Props = LinkProps & {
    label?: string;
};
declare const Link: ({ children, label, ...props }: Props) => JSX.Element;
export { Link };
