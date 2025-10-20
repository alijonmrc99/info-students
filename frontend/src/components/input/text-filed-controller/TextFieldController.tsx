import { FC } from "react";
import Group from "antd/es/input/Group";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input, InputProps, Space } from "antd";
import { Control } from "react-hook-form";
import Search, { SearchProps } from "antd/es/input/Search";
import TextArea, { TextAreaProps } from "antd/es/input/TextArea";
import Password, { PasswordProps } from "antd/es/input/Password";

export type InputCompounds = {
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
};

export type TextFieldControllerProps = InputProps &
  SearchProps &
  TextAreaProps &
  PasswordProps & {
    control: Control<any>;
    name: string;
    inputCompound?: keyof InputCompounds;
    label?: string
  };

export const TextFieldController: FC<TextFieldControllerProps> = ({
  control,
  name,
  inputCompound,
  label,
  ...props
}) => {
  const { t } = useTranslation();
  const ControlledInput = inputCompound
    ? (Input[inputCompound] as typeof Input)
    : Input;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...fieldProps }, fieldState: { error } }) => (
        <Space style={{ width: '100%' }} size={'small'} direction={'vertical'}>
          {label && <label className="controller-label">{label}</label>}
          <ControlledInput {...{ ...props, ...fieldProps }} type="default" />
          <small style={{ color: "red" }}>{error?.message ? t(error.message) : null}</small>
        </Space>
      )}
    />
  );
};
