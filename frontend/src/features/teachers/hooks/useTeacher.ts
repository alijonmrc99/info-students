import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { message } from "antd";


import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { ROUTE_BACKEND_HOME, ROUTE_TEACHERS } from "../../../common/constants/route.constants";
import { onTeacher } from "../thunks";
import { UserScheme } from "../schemas";
import { notificationSlice } from "../../../common/notification";
import { teacherSlice } from "../slices";
import { ITeacher } from "../models";



export const useUsers = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const defaultValues: any = {
        email: "",
        fullName: "",
        password: "",
        role: "",
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, watch, getValues, reset, formState: { errors }, setValue } = useForm({
        defaultValues,
        resolver: yupResolver(UserScheme),
        mode: "onBlur"
    })

    const [messageApi, contexHolder] = message.useMessage();

    const handleError = (errors: any) => {
        console.log(errors);

        messageApi.open({
            type: 'error',
            content: errors?.message || "Error message"
        })
        notificationSlice.actions.open({ message: "Error message", type: "error" })
    };

    const onSubmit = (values: ITeacher) => {
        setIsLoading(true);


        dispatch(onTeacher({ values: values, id: values.id }))
            .then((res) => {
                if (res?.payload?.response?.data?.errors)
                    throw res.payload.response.data
                else {
                    reset()
                    navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_TEACHERS}`)
                    dispatch(teacherSlice.actions.emptyState())
                }
            })
            .catch(handleError)
            .finally(() => {
                setIsLoading(false)
            })


    }
    const handleSendForm = handleSubmit(onSubmit);

    return { control, getValues, watch, handleSendForm, setValue, isLoading, contexHolder, errors, register }
}

