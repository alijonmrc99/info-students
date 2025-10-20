import { Checkbox, CheckboxProps } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { FC } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

export type CheckboxControllerProps = CheckboxProps & {
  control: Control<any>;
  name: string;
  label?: string;
  setValue: UseFormSetValue<any>
};

export const CheckboxController: FC<CheckboxControllerProps> = ({
  control,
  name,
  label,
  setValue,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: {value, ...fieldProps}}) => {
        const onChange = (e: CheckboxChangeEvent) => {
            setValue(name,  e.target.checked)
        }
        return <Checkbox onChange={onChange} checked={value} {...props}>{label}</Checkbox>;
      }}
    ></Controller>
  );
};