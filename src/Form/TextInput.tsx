import React from "react";
import { useField } from "formik";

import { InputLabel } from "./InputLabel";

type InputProps = {
	name: string;
	id?: string;
	placeholder?: string;
	disabled?: boolean;
};

type Props = InputProps & {
	label?: string;
	descriptor?: string | React.ReactNode;
	required?: boolean;
	rightLabel?: boolean;
	autoFocus?: boolean;
	onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
	onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
	error?: string;
};

type InputType = "text" | "number" | "email" | "phone" | "password";

function makeInput<T extends string | number = string, P extends object = {}>(
	type: InputType,
	defaultPlaceholder: string = "",
	mutator?: (props: P, value: T) => T
) {
	return (props: Props & P) => {
		const { label, descriptor, required, rightLabel, error, placeholder, ...inputProps } = props;
		const [field, meta, helpers] = useField<T>(props.name);

		const touched = meta.touched && (meta.value === "" || meta.value === 0);
		const className = `input-field ${type} ${touched ? "touched " : ""}`;

		return (
			<div className={className}>
				{descriptor && <p>{descriptor}</p>}
				{label && !rightLabel && <InputLabel label={label} for={field.name} required={required} />}
				<input
					{...field}
					{...inputProps}
					type={type}
					placeholder={placeholder ?? defaultPlaceholder}
					onChange={(ev) => {
						field.onChange(ev);
						if (mutator) helpers.setValue(mutator(props, ev.target.value as any));
					}}
				/>
				{label && rightLabel && <span>{label}</span>}
				<div className="flare" />
				{meta.touched && meta.error && meta.error !== "" && <p className="invalid">{meta.error}</p>}
			</div>
		);
	};
}

const TextInput = makeInput("text", "");
const EmailInput = makeInput("email", "name@company.com");
const PhoneInput = makeInput("phone", "(555) 555-5555");
const PasswordInput = makeInput("password");

type NumberProps = {
	min?: number;
	max?: number;
};

type NumberInputProps = NumberProps & {
	step?: number;
};

const NumberInput = makeInput<number, NumberInputProps>("number", "Number");

const NumberTextInput = makeInput<number | string, NumberProps>("text", "", (props, value) => {
	const min = props.min ?? 0;
	const max = props.max ?? 999999999999;

	const valueNumber = parseInt(value as any);
	const isInvalid = isNaN(valueNumber);
	const clampedValue = Math.max(Math.min(valueNumber, max), min);

	return isInvalid ? "" : clampedValue;
});

export { TextInput, EmailInput, PhoneInput, PasswordInput, NumberTextInput, NumberInput };
