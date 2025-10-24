import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { message } from "antd";


import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { IPlaceSend } from "../models";
import { ROUTE_BACKEND_HOME, ROUTE_STUDENTS } from "../../../common/constants/route.constants";
import { placeSlice } from "../slices/place.slice";
import { onPlace } from "../thunks";
import { PlaceScheme } from "../schemas";
import { gpsToDecimal } from "../../../common/functions/functions";
import { notificationSlice } from "../../../common/notification";



export const usePlace = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const defaultValues: any = {
        name: "",
        coordinateX: "",
        coordinateY: "",
        secondName: "",
        height: "",
        // Add other properties of IPlace here
    }

    const [isLoading, setIsLoading] = useState(false);
    const { register, control, handleSubmit, watch, getValues, reset, formState: { errors }, setValue } = useForm({
        defaultValues,
        resolver: yupResolver(PlaceScheme),
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

    const onSubmit = (values: IPlaceSend) => {
        // setIsLoading(true);
        console.log(values);

        // change GPS coordinates to decimal
        values.coordinateX = gpsToDecimal(values.coordinateX)
        values.coordinateY = gpsToDecimal(values.coordinateY)
        values.images = values?.images?.map((image: any) => image.path ? image.path : image)

        dispatch(onPlace({ values: values, id: values.id }))
            .then(() => {
                reset()
                navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_STUDENTS}`)
                dispatch(placeSlice.actions.emptyState())
            })
            .catch(handleError)
            .finally(() => {
                setIsLoading(false)
            })


    }
    const handleSendForm = handleSubmit(onSubmit);

    return { control, getValues, watch, handleSendForm, setValue, isLoading, contexHolder, errors, register }
}

