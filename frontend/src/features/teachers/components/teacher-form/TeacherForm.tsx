import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { TEACHER_FULLNAME, TEACHER_EMAIL } from '../../constants'
import { useUsers } from "../../hooks";
import { ID } from "../../../../common/models";
import './sytles.scss';
import { fetchOneTeacher } from "../../thunks";
import { SelectController } from "../../../../components/input/select-controller";

import { httpApi } from "../../../../App";
import { teacherSlice } from "../../slices";

export const TeacherForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, handleSendForm } = useUsers();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: teacher } = useAppSelector(state => state.teacher);
    const [grades, setGrades] = useState<{ id: ID, name: string }[]>([])

    useEffect(() => {
        if (id) {
            dispatch(fetchOneTeacher(id))
        }

        return () => {
            // Cleanup if needed
            dispatch(teacherSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {
        httpApi.get<[{ id: ID, name: string }]>('teachers/grades', {}).then(res => {
            setGrades(res || [])
        }).catch(err => console.log(err)
        )
    }, [])

    useEffect(() => {
        if (teacher) {
            setValue('id', teacher.id)
            setValue('fullName', teacher.fullName)
            setValue('email', teacher.email)
            setValue("phone", teacher.phone)
            setValue("gradeIds", teacher.grades?.map(grade => grade.id) || [])
        }

    }, [teacher, t])

    return <div className="place-form">
        <Divider orientation="left">
            <h4>{teacher?.fullName ? `${teacher.fullName.slice(0, 100)} ...` : `${t('new')} ${t('user').toLowerCase()} ${t('add').toLowerCase()} `}</h4>
        </Divider>
        <form onSubmit={handleSendForm}>
            <Row gutter={20} className="form-item">
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('full_name')} name={TEACHER_FULLNAME} label={t('full_name')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('email')} name={TEACHER_EMAIL} label={t('email')} />
                </Col>

                <Col xs={24} md={12}>
                    <SelectController
                        control={control}
                        setValue={setValue}
                        name="gradeIds"
                        label={t('select_grade')}
                        mode="multiple"
                        items={grades.map(item => ({ value: item.id, label: item.name }))}
                    />
                </Col>

            </Row>

            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}