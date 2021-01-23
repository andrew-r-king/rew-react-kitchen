import React from "react";

type Props = {
	label: string;
	for?: string;
	required?: boolean;
};

export const InputLabel = (props: Props) => {
	return (
		<label htmlFor={props.for}>
			{props.label} {props.required && <span className="required"> *</span>}
		</label>
	);
};
