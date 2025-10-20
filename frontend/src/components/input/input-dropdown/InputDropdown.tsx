import { FC, useState } from "react";
import { CheckOutlined, UpCircleOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


import './styles.scss';

interface IInputDropdownProps {
    onChange: (selectedValue: any) => void;
    onClose: () => void;
    options: { value: any, label: string }[];
    styles?: { width: string }
    multiple?: boolean;
}

export const InputDropdown: FC<IInputDropdownProps> = ({ onChange, options, multiple = false, styles, onClose }) => {
    const [values, setValues] = useState<any[]>([]);
    const { t } = useTranslation();
    const handleChange = (value: any) => {
        let newValue: any = [];
        if (multiple) {
            if (values.includes(value)) {
                newValue = values.filter(item => item !== value);
            }
            else {
                newValue = [...values, value];
            }
            onChange(newValue)
        } else {
            if (values.length && values.includes(value)) {
                newValue = [];
            } else {
                newValue = [value];

            }
            onChange(newValue[0])
        }
        setValues(newValue)
    };

    const checkForSelected = (value: string): boolean => values.some(item => item.value === value);

    return <div className="dropdown" style={styles}>
        <div className="dropdown__header dropdown__item rounded" onClick={onClose}>
            <button onClick={onClose}>
                <span className="label">{t('all')}</span>
            </button>
            <div className="icon">
                <UpCircleOutlined />
            </div>
        </div>
        <div className="dropdown__content">
            <ul className="dropdown__items">
                {
                    options.map((option, index) => (
                        <li key={index} className={`dropdown__item ${checkForSelected(option.value) ? 'selected' : ''}`}>
                            <button onClick={() => handleChange(option)}>
                                <span className="label">{t(option.label)}</span>
                            </button>
                            <span className="icon">
                                <CheckOutlined />
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
}
