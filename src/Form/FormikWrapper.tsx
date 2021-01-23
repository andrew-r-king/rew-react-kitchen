import React, { useMemo } from "react";
import {
	Form,
	withFormik,
	FormikProps,
	FormikErrors,
	//FormikTouched,
	FormikBag,
} from "formik";
import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import {
	ArrayLocale,
	BooleanLocale,
	DateLocale,
	MixedLocale,
	NumberLocale,
	ObjectLocale,
	StringLocale,
} from "yup/lib/locale";

type FormLocale = {
	mixed?: MixedLocale;
	string?: StringLocale;
	number?: NumberLocale;
	date?: DateLocale;
	boolean?: BooleanLocale;
	object?: ObjectLocale;
	array?: ArrayLocale;
};

function setFormLocale(locale: FormLocale) {
	Yup.setLocale(locale);
}

export type FormProps<T> = {
	readonly isValid: boolean;
	readonly disabled: boolean;
	readonly initialValues: T;
	readonly values: T;
	readonly errors: FormikErrors<Partial<T>>;
	// readonly touched: FormikTouched<Partial<T>>;
};

type Props<T> = {
	// onValidate?: (errors: Partial<T>, values?: T) => Promise<Partial<T>> | Partial<T>;
	validationSchema?: (validate: typeof Yup) => ObjectShape;
	onSubmit: (values: T) => Promise<void> | void;
};

function useFormikForm<Values extends { [key: string]: any }, OuterProps extends object = {}>(
	InnerForm: React.ComponentType<FormProps<Values> & object>,
	initialValues: Values,
	dependencies: React.DependencyList
) {
	const WrappedForm = useMemo(() => {
		return withFormik<Props<Values> & OuterProps, Values>({
			mapPropsToValues: (_props: Props<Values>) => initialValues,

			validationSchema: (props: Props<Values>) => {
				if (props.validationSchema) return Yup.object().shape(props.validationSchema(Yup));
				return Yup.object().shape({});
			},
			handleSubmit: (values: Values, { props }: FormikBag<Props<Values>, Values>) => {
				let outValues = values;

				for (const [key, value] of Object.entries(initialValues)) {
					if (typeof value === "number" && typeof outValues[key] === "string") {
						if (outValues[key] === "") (outValues as any)[key] = null;
						else (outValues as any)[key] = +outValues[key];
					}
				}
				return props.onSubmit(outValues);
			},
		})((formikProps: FormikProps<Values> & OuterProps) => {
			const { isValid } = formikProps;

			const props: FormProps<Values> & OuterProps = {
				...formikProps,
				disabled: !isValid,
			};
			return <InnerForm {...props} />;
		});
	}, dependencies);
	return WrappedForm;
}

export { Form, useFormikForm, setFormLocale };
