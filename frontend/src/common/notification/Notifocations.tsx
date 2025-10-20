import { notification } from "antd";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store";
import { notificationSlice } from "./notification.slice";

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Notifacation: FC = () => {
    const { t } = useTranslation();
    const [api, contextHolder] = notification.useNotification();
    const { is_open, message, type } = useAppSelector(state => state.notification);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (is_open)
            openNotification(type)


    }, [type, is_open, message])


    const openNotification = (type: NotificationType = 'info') => {
        api[type]({
            message: t(type),
            description: t(message),
            duration: 2,
            onClose: () => {
                dispatch(notificationSlice.actions.close())
            }
        })
    }


    return (
        <span>{contextHolder}</span>
    )
}