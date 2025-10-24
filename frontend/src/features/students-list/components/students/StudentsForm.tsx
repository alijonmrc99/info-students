import { FC, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, DatePicker, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { fetchOneStundent } from "../../thunks";
import { studentSlice } from "../../slices";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { BIRTHDATE, CLASS_ID, FULLNAME, GENDER, GRADE_ID, PHONE_NUMBER, } from '../../constants'
import { usePlace } from "../../hooks";
import { ID, } from "../../../../common/models";
import './sytles.scss';
import { DatePickerController } from "../../../../components/input/datepicker-controller";
import { GENDER_ARRAY, GRADES_ARRAY } from "../../../../common/constants/base.constants";
import { SelectController } from "../../../../components/input/select-controller";

export const StudentsForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, handleSendForm } = usePlace();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: student } = useAppSelector(state => state.student);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneStundent(id))
        }
    }, [t])

    useEffect(() => {
        window.scrollTo(0, 0)

        return () => {
            dispatch(studentSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {

    }, [t])

    useEffect(() => {
        if (student) {
            setValue("id", student.id)
            setValue("fullName", student.fullName)
            setValue("phone", student.phone)
            setValue("birthDate", student.birthDate ? new Date(student.birthDate) : null)
            setValue("gender", student.gender)
            setValue("gradeId", student.grade?.id)
            setValue("classId", student.class?.id)
        }

    }, [student, t])

    return <div className="place-form">
        <Divider orientation="left">
            <h4>{student?.fullName ? `${student.fullName}` : `${t('new')} ${t('student').toLowerCase()} ${t('add').toLowerCase()} `}</h4>
        </Divider>
        <form onSubmit={handleSendForm}>
            <Row gutter={20} className="form-item">
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('student_fullname')} name={FULLNAME} label={t('student_fullname')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('phone_number')} name={PHONE_NUMBER} label={t('phone_number')} />
                </Col>
                <Col xs={24} md={12}>
                    <DatePickerController setValue={setValue} control={control} placeholder={`Tug'ilgan sanasi`} name={BIRTHDATE} label={t('birthdate')} />
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={GENDER_ARRAY?.map(item => ({ value: item.value, label: t(item.label) })) || []}
                        setValue={setValue}
                        placeholder={t('gender')}
                        label={t('gender')}
                        name={GENDER}
                        control={control} />
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={GRADES_ARRAY?.map(item => ({ value: Number(item) - 4, label: item })) || []}
                        setValue={setValue}
                        placeholder={t('grade')}
                        label={t('grade')}
                        name={GRADE_ID}
                        control={control} />
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={[{ value: 1, label: 'Green' }, { value: 2, label: 'Blue' }]}
                        setValue={setValue}
                        placeholder={t('class')}
                        label={t('class')}
                        name={CLASS_ID}
                        control={control} />
                </Col>
            </Row>
            <Divider orientation="left">
                <h4>{t('achievements')}</h4>
            </Divider>
            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}