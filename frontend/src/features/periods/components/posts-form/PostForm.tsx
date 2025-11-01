import { FC, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { fetchOnePost } from "../../thunks";
import { postSlice } from "../../slices";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { POST_CONTENT, POST_GRADE_ID, POST_IMAGE_ID, POST_TITLE } from '../../constants'
import { usePost } from "../../hooks";
import { ID } from "../../../../common/models";
import './sytles.scss';
import { ImageUploader } from "../../../../components/input/file-uploader/ImageUploader";

import { SelectController } from "../../../../components/input/select-controller";

export const PostForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, watch, handleSendForm } = usePost();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: post } = useAppSelector(state => state.post);
    const { result: me } = useAppSelector(state => state.me);

    const grades = [
        { label: "5 grade", value: 1 },
        { label: "6 grade", value: 2 },
        { label: "7 grade", value: 3 },
        { label: "8 grade", value: 4 },
        { label: "9 grade", value: 5 },
        { label: "10 grade", value: 6 },
        { label: "11 grade", value: 7 },
    ]

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePost(id))
            // dispatch(fetchMe())
        }
    }, [t])

    console.log(watch('imageId'));


    useEffect(() => {
        window.scrollTo(0, 0)

        return () => {
            dispatch(postSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {
        if (post) {
            setValue('id', id)
            setValue('title', post.title)
            setValue('content', post.content)
            setValue('gradeId', post.gradeId)
            setValue('imageId', post?.imageId)
        }

    }, [post, t])

    return <div className="place-form">
        <Divider orientation="left">
            <h4>{post?.title ? `${post.title.slice(0, 100)} ...` : `${t('new')} ${t('post').toLowerCase()} ${t('add').toLowerCase()} `}</h4>
        </Divider>
        <form onSubmit={handleSendForm}>
            <Row gutter={20} className="form-item">
                <Col xs={24} md={12}>
                    <TextFieldController control={control}
                        placeholder={t('title')}
                        name={POST_TITLE}
                        label={t('title')} />
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        name={POST_GRADE_ID}
                        label="choose_grade"
                        setValue={setValue}
                        control={control}
                        items={me?.role === "TEACHER" ? me.teacher.grades.map(item => ({ value: item.id, label: item.name }))
                            : grades}
                        placeholder={"choose_grade"}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController
                        inputCompound="TextArea"
                        style={{ height: 200 }}
                        control={control}
                        placeholder={t('content')}
                        name={POST_CONTENT}
                        label={t('content')} />
                </Col>



                <Col xs={24} md={12}>
                    <ImageUploader
                        setValue={setValue}
                        name={POST_IMAGE_ID}
                        label={t('poster_image')}
                        type="post"
                        path="post"
                        value={post && post.image.path}
                        customStyle={{ height: 300 }}
                    />
                </Col>

            </Row>

            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}