import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { AUTH_FIELD_PASSWORD, AUTH_FIELD_EMAIL } from "../constants";
import { message } from "antd";
import { ILoginQuery, ILogin } from "../models";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_AUTH_LOGIN } from "../endpoints";
import { setBearerToken } from "../../../common/axios";
import { ROUTE_BACKEND_HOME } from "../../../common/constants/route.constants";
import { LoginSchema } from "../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
const httpApi = new HttpApi();

export const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {
            [AUTH_FIELD_EMAIL]: "",
            [AUTH_FIELD_PASSWORD]: "",
        },
        resolver: yupResolver(LoginSchema),
        mode: "onBlur"
    });

    const [messageApi, contextHolder] = message.useMessage();

    const handleErrors = (errors: any) => {
        console.log(errors);

        message.open({
            type: "error",
            content: errors.response?.data?.message || "Error Message"
        })
    }

    const onSubmit = (values: ILoginQuery) => {
        setIsLoading(true);
        login(values).then((response) => {
            setBearerToken(response.accessToken);
            navigate(ROUTE_BACKEND_HOME);
        }).catch((errors) => {
            handleErrors(errors);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleLogin = handleSubmit(onSubmit);

    return {
        register,
        control,
        errors,
        handleLogin,
        isLoading,
        messageApi,
        contextHolder,
        setValue
    }
}

export const login = (body: ILoginQuery): Promise<ILogin> => {
    const loginData = new URLSearchParams();
    loginData.append('email', body.username);
    loginData.append('password', body.password);

    return httpApi.post(ENDPOINT_AUTH_LOGIN, loginData.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => response);
}