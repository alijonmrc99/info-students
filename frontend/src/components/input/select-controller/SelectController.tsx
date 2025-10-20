import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectProps, Space } from "antd";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

const { Option } = Select;

export type SelectControllerProps = SelectProps & {
  control: Control<any>;
  name: string;
  items: { value: any, label: string }[];
  label?: string;
  setValue: UseFormSetValue<any>
};

export const SelectController: FC<SelectControllerProps> = ({
  control,
  name,
  label,
  setValue,
  items,
  defaultValue,
  ...props
}) => {

  const { t } = useTranslation();

  const onChange = (value: any) => {
    setValue(name, value)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...fieldProps }, fieldState: { error } }) => {
        return <Space style={{ width: '100%' }} size={'small'} direction={'vertical'}>
          {label && <label className="controller-label">{label}</label>}
          <Select
            showSearch
            value={value}
            style={{ width: '100%' }}
            className="h-auto"
            {...fieldProps}
            onChange={onChange}
            {...props}
            allowClear
            filterOption={(input, option) =>
              option?.children
                ? option.children.toString().toLowerCase().includes(input.toLowerCase())
                : false
            }
          >
            {items.map((option) => (
              <Option key={option.value} value={option.value}>
                {t(option.label)}
              </Option>
            ))}
          </Select>
          <small>{error?.message ? t(error.message) : null}</small>
        </Space>
      }}
    ></Controller>
  );
};