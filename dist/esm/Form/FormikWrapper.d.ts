import React from "react";
import { Form, FormikErrors } from "formik";
import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { ArrayLocale, BooleanLocale, DateLocale, MixedLocale, NumberLocale, ObjectLocale, StringLocale } from "yup/lib/locale";
declare type FormLocale = {
    mixed?: MixedLocale;
    string?: StringLocale;
    number?: NumberLocale;
    date?: DateLocale;
    boolean?: BooleanLocale;
    object?: ObjectLocale;
    array?: ArrayLocale;
};
declare function setFormLocale(locale: FormLocale): void;
export declare type FormProps<T> = {
    readonly isValid: boolean;
    readonly disabled: boolean;
    readonly initialValues: T;
    readonly values: T;
    readonly errors: FormikErrors<Partial<T>>;
};
declare type Props<T> = {
    validationSchema?: (validate: typeof Yup) => ObjectShape;
    onSubmit: (values: T) => Promise<void> | void;
};
declare function useFormikForm<Values extends {
    [key: string]: any;
}, OuterProps extends object = {}>(InnerForm: React.ComponentType<FormProps<Values> & object>, initialValues: Values, dependencies: React.DependencyList): React.ComponentType<Props<Values> & OuterProps>;
export { Form, useFormikForm, setFormLocale };
