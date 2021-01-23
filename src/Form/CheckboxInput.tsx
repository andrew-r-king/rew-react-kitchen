import React from "react";
import { useField } from "formik";

type Props = {
    name: string;
    groupName?: string;
    label: string;
    disabled?: boolean;
    className?: string;
};

const CheckboxInput = ({ disabled, label, className, ...props }: Props) => {
    const [field] = useField(props.name);

    const groupName = props.groupName ? props.groupName + "[]" : field.name;

    return (
        <label htmlFor={field.name} className={`input-checkbox ${className || ""}`}>
            <input
                {...field}
                id={field.name}
                value={field.name}
                type="checkbox"
                name={groupName}
                disabled={disabled || false}
                onChange={(ev) =>
                    field.onChange({
                        ...ev,
                        target: {
                            name: ev.target.value,
                            value: ev.target.checked,
                            groupName: ev.target.name
                        }
                    })
                }
            />
            <span className="checkmark" />
            <span className="padded-label">{label}</span>
        </label>
    );
};

export { CheckboxInput };
