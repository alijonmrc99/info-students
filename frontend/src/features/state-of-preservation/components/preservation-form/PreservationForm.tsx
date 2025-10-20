import { FC, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import { PLACE_NAME_EN, PLACE_NAME_UZ } from '../../constants'
import { usePreservation } from "../../hooks";
import { ID } from "../../../../common/models";
import './sytles.scss';
import { fetchOnePreservation } from "../../thunks";
import { perservationSlice } from "../../slices";

export const PreservationForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, handleSendForm } = usePreservation();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: perservation } = useAppSelector(state => state.perservation);

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePreservation(id))
        }
    }, [t])

    useEffect(() => {
        window.scrollTo(0, 0)

        return () => {
            dispatch(perservationSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {
        if (perservation) {
            setValue('id', id)
            setValue('nameUz', perservation.nameUz)
            setValue('nameEn', perservation.nameEn)
        }

    }, [perservation, t])

    return <div className="place-form">
        <Divider orientation="left">
            <h4>{perservation?.name ? `${perservation.name.slice(0, 100)} ...` : `${t('new')} ${t('period').toLowerCase()} ${t('add').toLowerCase()} `}</h4>
        </Divider>
        <form onSubmit={handleSendForm}>
            <Row gutter={20} className="form-item">
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('preiod_name_uz')} name={PLACE_NAME_UZ} label={t('preiod_name_uz')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('preiod_name_en')} name={PLACE_NAME_EN} label={t('preiod_name_en')} />
                </Col>

            </Row>

            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}