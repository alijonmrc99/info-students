import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { USER_FULLNAME, USER_PASSWORD, USER_EMAIL } from '../../constants'
import { useUsers } from "../../hooks";
import { ID } from "../../../../common/models";
import './sytles.scss';
import { fetchOneUser } from "../../thunks";
import { SelectController } from "../../../../components/input/select-controller";
import { userSlice } from "../../slices";
import { httpApi } from "../../../../App";

export const UserForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, watch, handleSendForm } = useUsers();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: user } = useAppSelector(state => state.user);
    const [teacher, setTeacher] = useState<{ id: ID, fullName: string }[]>([])
    const role = [
        { value: "ADMIN", label: 'admin' },
        { value: "TEACHER", label: 'teacher' },
    ];
    useEffect(() => {
        if (id) {
            dispatch(fetchOneUser(id))
        }

        return () => {
            // Cleanup if needed
            dispatch(userSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {
        httpApi.get<[{ id: ID, fullName: string }]>('teachers', {}).then(res => {
            setTeacher(res || [])
        }).catch(err => console.log(err)
        )
    }, [])

    useEffect(() => {
        if (user) {
            setValue('id', user.id)
            setValue('fullName', user.fullName)
            setValue('email', user.email)
            setValue('role', user.role)
            setValue("phone", user.phone)
            setValue("teacherId", user.teacherId)
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
                    <TextFieldController control={control} placeholder={t('email')} name={USER_EMAIL} label={t('email')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController inputCompound="Password" control={control} placeholder={t('password')} name={USER_PASSWORD} label={t('password')} />
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        control={control}
                        setValue={setValue}
                        name="role"
                        label={t('role')}
                        items={role}
                    />
                </Col>
                {
                    watch('role') === "TEACHER" &&
                    <Col xs={24} md={12}>
                        <SelectController
                            control={control}
                            setValue={setValue}
                            name="teacherId"
                            label={t('teacher_id')}
                            items={teacher.map(item => ({ value: item.id, label: item.fullName }))}
                        />
                    </Col>
                }
            </Row>

            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}