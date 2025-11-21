import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { fetchOneStundent } from "../../thunks";
import { studentSlice } from "../../slices";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { BIRTHDATE, CLASS_ID, EMAIL, FILES, FULLNAME, GENDER, GRADE_ID, IMAGE_PATH, PHONE_NUMBER, } from '../../constants'
import { usePlace } from "../../hooks";
import { ID, } from "../../../../common/models";
import './sytles.scss';
import { DatePickerController } from "../../../../components/input/datepicker-controller";
import { GENDER_ARRAY, GRADES_ARRAY } from "../../../../common/constants/base.constants";
import { SelectController } from "../../../../components/input/select-controller";
import { FileUploader } from "../../../../components/input/file-uploader";
import { ENDPOINT_BASE_URL } from "../../../../common/constants/endpoind.constants";
import { deleteFile } from "../../../../common/functions";
import { ImageUploader } from "../../../../components/input/file-uploader/ImageUploader";


export const StudentsForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contextHolder, messageApi, control, setValue, isLoading, handleSendForm } = usePlace();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: student } = useAppSelector(state => state.student);

    const [studentFiles, setStudentFiles] = useState<{ id: ID, path: string, name: string }[]>(student?.files || [])
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
            setValue("email", student.email)
            setValue("birthDate", student.birthDate ? new Date(student.birthDate) : null)
            setValue("gender", student.gender)
            setValue("gradeId", student.grade?.id)
            setValue("classId", student.class?.id)
            setStudentFiles(student.files || [])
            setValue("imagePath", student.imagePath || null)
        }

    }, [student, t])


    return <div className="student-form">
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
                    <TextFieldController control={control} placeholder={t('email')} name={EMAIL} label={t('email')} />
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
                <h4>{t('achievements')}</h4>   </Divider>
            <Row gutter={30} className="section2">
                <Col md={24} xl={12}>
                    <Row>
                        <Col xs={24}>
                            <FileUploader
                                multiple={true}
                                path="files"
                                name={FILES}
                                setValue={setValue}
                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png, image/gif, image/bmp,  image/webp"
                                label={t('achievment_files')}
                                customStyle={{ width: "100%", height: "40px" }}
                            />
                        </Col>
                        <Col xs={24}>
                            <p>{t("current_files")}</p>
                            <ul className="file-container">
                                {
                                    studentFiles && studentFiles.length > 0
                                    && studentFiles.map((file, index) => (
                                        <li className="student-file" key={file.id}>
                                            <a key={file.id} href={`${ENDPOINT_BASE_URL}${file.path}`} target="_blank" rel="noopener noreferrer">
                                                {index + 1}. {file.name}
                                            </a>
                                            <button type="button" onClick={() => {
                                                deleteFile(file.id).then(() => {
                                                    setStudentFiles(studentFiles?.filter(f => f.id !== file.id));
                                                    messageApi.success({ content: t("file_delete_success") })
                                                }
                                                ).catch((_err) => {
                                                    messageApi.error({ content: t("file_delete_error") })
                                                })
                                            }} className="delete-file-button">
                                                x
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>

                    </Row>
                </Col>
                <Col md={24} xl={12}>
                    <ImageUploader
                        setValue={setValue}
                        value={student?.imagePath || null}
                        name={IMAGE_PATH}
                        path="image"
                        label={t('student_image')}
                        customStyle={{ width: "100%", height: "100%", }}
                    />
                </Col>


            </Row>
            {contextHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}