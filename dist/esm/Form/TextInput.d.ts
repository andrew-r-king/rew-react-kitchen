import React from "react";
declare type InputProps = {
    name: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
};
declare const TextInput: (props: InputProps & {
    label?: string | undefined;
    descriptor?: string | React.ReactNode;
    required?: boolean | undefined;
    rightLabel?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onFocus?: ((ev: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onKeyDown?: ((ev: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    error?: string | undefined;
}) => JSX.Element;
declare const EmailInput: (props: InputProps & {
    label?: string | undefined;
    descriptor?: string | React.ReactNode;
    required?: boolean | undefined;
    rightLabel?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onFocus?: ((ev: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onKeyDown?: ((ev: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    error?: string | undefined;
}) => JSX.Element;
declare const PhoneInput: (props: InputProps & {
    label?: string | undefined;
    descriptor?: string | React.ReactNode;
    required?: boolean | undefined;
    rightLabel?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onFocus?: ((ev: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onKeyDown?: ((ev: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    error?: string | undefined;
}) => JSX.Element;
declare const PasswordInput: (props: InputProps & {
    label?: string | undefined;
    descriptor?: string | React.ReactNode;
    required?: boolean | undefined;
    rightLabel?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onFocus?: ((ev: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onKeyDown?: ((ev: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    error?: string | undefined;
}) => JSX.Element;
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
