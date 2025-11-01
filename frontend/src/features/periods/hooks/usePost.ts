import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { message } from "antd";


import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { IPost } from "../models";
import { ROUTE_BACKEND_HOME, ROUTE_POSTS } from "../../../common/constants/route.constants";
import { postSlice } from "../slices/post.slice";
import { onPost } from "../thunks";
import { PeriodScheme } from "../schemas";
import { notificationSlice } from "../../../common/notification";



export const usePost = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const defaultValues: any = {

    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, watch, getValues, reset, formState: { errors }, setValue } = useForm({
        defaultValues,
        resolver: yupResolver(PeriodScheme),
        mode: "onBlur"
    })

    const [messageApi, contexHolder] = message.useMessage();

    const handleError = (errors: any) => {
        messageApi.open({
            type: 'error',
            content: errors?.message || "Error message"
        })
        notificationSlice.actions.open({ message: "Error message", type: "error" })
    };

    const onSubmit = (values: IPost) => {
        setIsLoading(true);


        dispatch(onPost({ values: values, id: values.id }))
            .then(() => {
                reset()
                navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_POSTS}`)
                dispatch(postSlice.actions.emptyState())
            })
            .catch(handleError)
            .finally(() => {
                setIsLoading(false)
            })


    }
    const handleSendForm = handleSubmit(onSubmit);

    return { control, getValues, watch, handleSendForm, setValue, isLoading, contexHolder, errors, register }
}

