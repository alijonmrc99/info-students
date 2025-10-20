import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { message } from "antd";


import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { ROUTE_BACKEND_HOME, ROUTE_PRESERVATIONS } from "../../../common/constants/route.constants";
import { onPreservation } from "../thunks";
import { PreservationScheme } from "../schemas";
import { notificationSlice } from "../../../common/notification";
import { perservationsSlice } from "../slices";
import { IPreservation } from "../models";



export const usePreservation = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const defaultValues: any = {
        nameEn: "",
        nameUz: "",
        // Add other properties of IPlace here
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, watch, getValues, reset, formState: { errors }, setValue } = useForm({
        defaultValues,
        resolver: yupResolver(PreservationScheme),
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

    const onSubmit = (values: IPreservation) => {
        setIsLoading(true);


        dispatch(onPreservation({ values: values, id: values.id }))
            .then(() => {
                reset()
                navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_PRESERVATIONS}`)
                dispatch(perservationsSlice.actions.emptyState())
            })
            .catch(handleError)
            .finally(() => {
                setIsLoading(false)
            })


    }
    const handleSendForm = handleSubmit(onSubmit);

    return { control, getValues, watch, handleSendForm, setValue, isLoading, contexHolder, errors, register }
}

