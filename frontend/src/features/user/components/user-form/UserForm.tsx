import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { USER_NAME, USER_FULLNAME, USER_PASSWORD, USER_EMAIL } from '../../constants'
import { useUsers } from "../../hooks";
import { ID, IResponse } from "../../../../common/models";
import './sytles.scss';
import { fetchOneUser } from "../../thunks";
import { userSlice } from "../../slices";
import { httpApi } from "../../../../App";
import { ENDPOINT_ROLES } from "../../endpoints";
import { SelectController } from "../../../../components/input/select-controller";

export const UserForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, handleSendForm } = useUsers();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: user } = useAppSelector(state => state.user);
    const [role, setRole] = useState<{ id: ID, name: string }[] | undefined>(undefined)
    useEffect(() => {
        if (id) {
            dispatch(fetchOneUser(id))
        }
    }, [t])

    useEffect(() => {
        httpApi.get<IResponse<{ id: ID, name: string }[]>>(ENDPOINT_ROLES, {}).then((response) => {
            if (response) {
                setRole(response?.result.filter(item => item.name !== 'superAdmin'))
            }
        })

        return () => {
            dispatch(userSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {
        if (user) {
            setValue('id', user.id)
            setValue('fullName', user.fullName)
            setValue('username', user.username)
            setValue('email', user.email)
            if (user?.roles.length > 0)
                setValue('role', user?.roles[0].name)
        }

    }, [user, t])

    return <div className="place-form">
        <Divider orientation="left">
            <h4>{user?.username ? `${user.username.slice(0, 100)} ...` : `${t('new')} ${t('user').toLowerCase()} ${t('add').toLowerCase()} `}</h4>
        </Divider>
        <form onSubmit={handleSendForm}>
            <Row gutter={20} className="form-item">
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('full_name')} name={USER_FULLNAME} label={t('full_name')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('username')} name={USER_NAME} label={t('username')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('password')} name={USER_PASSWORD} label={t('password')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('email')} name={USER_EMAIL} label={t('email')} />
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        control={control}
                        setValue={setValue}
                        name="role"
                        label={t('role')}
                        items={role?.map((item) => ({ label: item.name, value: item.name })) || []}
                    />
                </Col>
            </Row>

            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}