import { Switch, SwitchProps } from "antd";
import { FC } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

export type SwitchControllerProps = SwitchProps & {
  control: Control<any>;
  name: string;
  label?: string;
  setValue: UseFormSetValue<any>
};

export const SwitchController: FC<SwitchControllerProps> = ({
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
      render={({ field: { value, ...fieldProps } }) => {
        const onChange = (checked: boolean) => {
          setValue(name, checked)
        }
        return <label style={{ display: "flex", gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
          {label}
          <Switch
            onChange={onChange}
            style={{ marginLeft: '20px' }}
            checked={value}
            {...props} />
          <span>
          </span>
        </label>
      }}
    ></Controller>
  );
};