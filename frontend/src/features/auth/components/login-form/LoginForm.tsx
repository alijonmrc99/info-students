import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import {
    AUTH_FIELD_PASSWORD,
    AUTH_FIELD_EMAIL,
} from "../../constants";
import { useLogin } from "../../hooks";
import './styles.scss';
import logo from '../../../../assets/images/logo.png';
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { withGuest } from "../../hocs";
import { useTranslation } from "react-i18next";


export const LoginForm: FC = withGuest(() => {
    const { control, isLoading, handleLogin, contextHolder } = useLogin();
    const { t } = useTranslation();
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form">
                    <div className="logo-container">
                        <img src={logo} alt="logo" className="logo" />
                    </div>
                    <h2>{t("site_name")}</h2>
                    <h3>{t("enter")}</h3>
                    <form onSubmit={handleLogin} className="form">
                        <Space className="w-full" direction={"vertical"} size={"middle"}>
                            <Space className="w-full" direction={"vertical"} size={"small"}>
                                <TextFieldController
                                    placeholder="Foydalanuvchi nomi"
                                    control={control}
                                    name={AUTH_FIELD_EMAIL}
                                    className="login-input"
                                />
                                <TextFieldController
                                    placeholder="Parol"
                                    inputCompound={"Password"}
                                    control={control}
                                    name={AUTH_FIELD_PASSWORD}
                                    className="login-input"
                                />


                                <Button
                                    disabled={isLoading}
                                    loading={isLoading}
                                    type="primary"
                                    className="login-button"
                                    htmlType="submit"
                                >
                                    Kirish
                                </Button>
                                <div>
                                    <span className="forgot-link">
                                        <Link to={''}>Parolni unitdingizmi?</Link>
                                    </span>
                                </div>
                            </Space>
                        </Space>
                        {contextHolder}

                    </form >
                </div>
            </div>

        </div>
    );
})
