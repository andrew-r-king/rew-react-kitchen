import React from "react";
declare type InputProps = {
    name: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
};
declare type Props = InputProps & {
    label?: string;
    descriptor?: string | React.ReactNode;
    required?: boolean;
    rightLabel?: boolean;
    autoFocus?: boolean;
    onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
    error?: string;
};
declare const TextInput: (props: Props) => JSX.Element;
declare const EmailInput: (props: Props) => JSX.Element;
declare const PhoneInput: (props: Props) => JSX.Element;
declare const PasswordInput: (props: Props) => JSX.Element;
declare type NumberProps = {
    min?: number;
    max?: number;
};
declare const NumberInput: (props: InputProps & {
    label?: string | undefined;
    descriptor?: string | React.ReactNode;
    required?: boolean | undefined;
    rightLabel?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onFocus?: ((ev: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onKeyDown?: ((ev: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    error?: string | undefined;
} & NumberProps & {
    step?: number | undefined;
}) => JSX.Element;
declare const NumberTextInput: (props: InputProps & {
    label?: string | undefined;
    descriptor?: string | React.ReactNode;
    required?: boolean | undefined;
    rightLabel?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onFocus?: ((ev: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onKeyDown?: ((ev: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    error?: string | undefined;
} & NumberProps) => JSX.Element;
export { TextInput, EmailInput, PhoneInput, PasswordInput, NumberTextInput, NumberInput };
