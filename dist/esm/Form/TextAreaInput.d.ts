import React from "react";
declare type AutoTextAreaProps = {
    name: string;
    id?: string;
    placeholder?: string;
    rows?: number;
    maxRows?: number;
    maxLength?: number;
    onKeyDown?: any;
    autoFocus?: boolean;
    required?: boolean;
};
declare type Props = AutoTextAreaProps & {
    label?: string;
    description?: string | React.ReactNode;
    showCount?: boolean;
};
declare const TextAreaInput: ({ name, maxLength: propsMaxLength, description, showCount, label, required, ...props }: Props) => JSX.Element;
export { TextAreaInput };
