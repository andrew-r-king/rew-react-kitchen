import React from "react";
import { useField } from "formik";
import AutoTextArea from "react-autosize-textarea";

const limitTextAreaInput = (value: string, maxLength: number): string => {
	let outValue: string = value || "";
	return outValue.substr(0, maxLength);
};

type AutoTextAreaProps = {
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

type Props = AutoTextAreaProps & {
	label?: string;
	description?: string | React.ReactNode;
	showCount?: boolean;
};

const TextAreaInput = ({
	name,
	maxLength: propsMaxLength,
	description,
	showCount,
	label,
	required,
	...props
}: Props) => {
	const [field, meta] = useField(name);
	const maxLength = propsMaxLength ?? 9999;

	let value = field.value;
	if (value !== undefined && value.length > maxLength) {
		value = limitTextAreaInput(value, maxLength);
	} else {
		value = value || "";
	}

	const className = `input-field textarea ${meta.touched ? "touched " : ""}`;

	return (
		<div className={className}>
			{description && (
				<p>
					{description}
					{!label && required && <span className="required"> *</span>}
				</p>
			)}
			{label && <label htmlFor={field.name}>{label}</label>}
			<AutoTextArea {...field} {...props} value={value} />
			{showCount && value.length >= 0 && (
				<div className="count">
					{value.length}/{maxLength}
				</div>
			)}
			{meta.touched && meta.error && meta.error !== "" && <p className="invalid">{meta.error}</p>}
		</div>
	);
};

export { TextAreaInput };
