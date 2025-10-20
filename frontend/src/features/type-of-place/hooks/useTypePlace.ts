import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { ROUTE_BACKEND_HOME, ROUTE_TYPE_PLACE } from "../../../common/constants/route.constants";
import { placeTypeSlice } from "../slices/place_type.slice";
import { onPlaceTypes } from "../thunks";
import { PlaceTypeScheme } from "../schemas";
import { notificationSlice } from "../../../common/notification";
import { ITypePlace } from "../models";

export const useTypePlace = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const defaultValues: any = {
        nameEn: "",
        nameUz: "",
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, watch, getValues, reset, formState: { errors }, setValue } = useForm({
        defaultValues,
        resolver: yupResolver(PlaceTypeScheme),
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

    const onSubmit = (values: ITypePlace) => {
        setIsLoading(true);


        dispatch(onPlaceTypes({ values: values, id: values.id }))
            .then(() => {
                reset()
                navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_TYPE_PLACE}`)
                dispatch(placeTypeSlice.actions.emptyState())
            })
            .catch(handleError)
            .finally(() => {
                setIsLoading(false)
            })


    }
    const handleSendForm = handleSubmit(onSubmit);

    return { control, getValues, watch, handleSendForm, setValue, isLoading, contexHolder, errors, register }
}

