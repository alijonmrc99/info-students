import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Space, InputNumberProps, InputNumber } from "antd";


export type NumberFieldControllerProps = InputNumberProps & {
  control: Control<any>;
  name: string;
  label?: string
};

export const NumberFieldController: FC<NumberFieldControllerProps> = ({
  control,
  name,
  label,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...fieldProps }, fieldState: { error } }) => (
        <Space style={{ width: '100%' }} size={'small'} direction={'vertical'}>
          {label && <label className="controller-label">{label}</label>}
          <InputNumber style={{ width: '100%' }} {...{ ...props, ...fieldProps }} />
          <small>{error?.message ? t(error.message) : null}</small>
        </Space>
      )}
    />
  );
};
