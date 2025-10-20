import { Dropdown, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import './style.scss';

export const Language: FC = () => {
    const { i18n } = useTranslation();
    const lang = localStorage.getItem('i18nextLng');
    const items: MenuProps['items'] = [
        {
            label: "UZ",
            key: 'Uz'
        },
        {
            label: "EN",
            key: 'En'
        },
        {
            label: "RU",
            key: 'Ru'
        }
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        i18n.changeLanguage(key)

    }
    return (
        <Dropdown className="lang" menu={{ items, onClick }} trigger={['click']}>
            <div className="current-lang">{lang}</div>
        </Dropdown>
    )
}