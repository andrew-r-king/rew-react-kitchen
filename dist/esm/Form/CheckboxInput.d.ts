declare type Props = {
    name: string;
    groupName?: string;
    label: string;
    disabled?: boolean;
    className?: string;
};
declare const CheckboxInput: ({ disabled, label, className, ...props }: Props) => JSX.Element;
export { CheckboxInput };
