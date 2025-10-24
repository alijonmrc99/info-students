import dayjs from 'dayjs';
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Space, DatePickerProps, DatePicker } from "antd";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

export type DatePickerControllerProps = DatePickerProps & {
  control: Control<any>;
  name: string;
  label?: string;
  setValue: UseFormSetValue<any>
};

export const DatePickerController: FC<DatePickerControllerProps> = ({
  control,
  name,
  label,
  setValue,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...fieldProps }, fieldState: { error } }) => {
        const onChange = (_date: dayjs.Dayjs | null, dateString: string | string[]) => {
          setValue(name, dateString)
        }
        return <Space style={{ width: '100%' }} size={'small'} direction={'vertical'}>
          {label && <label className="controller-label">{label}</label>}
          <DatePicker value={value ? dayjs(value) : undefined} {...fieldProps} onChange={onChange} {...props}></DatePicker>
          <small>{error?.message ? t(error.message) : null}</small>
        </Space>
      }}
    ></Controller>
  );
};