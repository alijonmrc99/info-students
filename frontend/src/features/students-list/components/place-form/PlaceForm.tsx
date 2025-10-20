import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { fetchOneStundent } from "../../thunks";
import { placeSlice } from "../../slices";
import { TextFieldController } from "../../../../components/input/text-filed-controller";
import {
    PLACE_AREA, PLACE_CADASTRAL_DOC, PLACE_COORDINATEX, PLACE_COORDINATEY, PLACE_DESCRIPTION, PLACE_DISTRICT, PLACE_EXPEDITION_TYPE, PLACE_HEIGHT, PLACE_INFORMER,
    PLACE_INFROMATION_BOARD, PLACE_NAME, PLACE_PERIODS, PLACE_PLONAGRAPHIC, PLACE_PRIMARY_STUDY, PLACE_PROVINCE, PLACE_SECOND_NAME, PLACE_SHURF, PLACE_SOURCE, PLACE_STATE_OF_PRESERVATION, PLACE_SURRONDED, PLACE_TYPE_OF_PLACE
} from '../../constants'
import { usePlace } from "../../hooks";
import { ID, IPlaceInner, IProvinceAndDistrict, IResponse } from "../../../../common/models";
import './sytles.scss';
import { httpApi } from "../../../../App";
import { ENDPOINT_STATE_PRESERVATION, ENDPOINT_DISTRICT, ENDPOINT_PLACE_TYPE, ENDPOINT_PROVINCE, ENDPOINT_PERIOD, ENDPOINT_EXPEDITION_TYPE, ENDPOINT_BASE_URL } from "../../../../common/constants/endpoind.constants";
import { SelectController } from "../../../../components/input/select-controller";
import { SwitchController } from "../../../../components/input/switch-controller";
import { FileUploader } from "../../../../components/input/file-uploader/FileUploader";
import { decimalToDMS } from "../../../../common/functions";
import { ImageUploader } from "../../../../components/input/file-uploader/ImageUploader";

export const PlaceForm: FC<{ level?: number, parentId?: ID }> = () => {
    const { contexHolder, control, setValue, isLoading, handleSendForm } = usePlace();
    const { t } = useTranslation();
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { result: place } = useAppSelector(state => state.place);
    const [province, setProvince] = useState<IProvinceAndDistrict[]>([]);
    const [district, setDistrict] = useState<IProvinceAndDistrict[]>([]);
    const [placeType, setPlaceType] = useState<IPlaceInner[]>([]);
    const [statePreservition, setStatePreservition] = useState<IPlaceInner[]>([]);
    const [periods, setPeriods] = useState<IPlaceInner[]>([]);
    const [expeditionType, setExpeditionType] = useState<{ id: ID, name: string }[]>([]);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneStundent(id))
        }
    }, [t])

    useEffect(() => {
        window.scrollTo(0, 0)

        return () => {
            dispatch(placeSlice.actions.emptyState())
        }
    }, [t])

    useEffect(() => {
        httpApi.get<IResponse<IProvinceAndDistrict[]>>(ENDPOINT_PROVINCE, {}).then(res => {
            setProvince(res?.result)
        })
        httpApi.get<IResponse<IProvinceAndDistrict[]>>(ENDPOINT_DISTRICT, {}).then(res => {
            setDistrict(res?.result)
        })
        httpApi.get<IResponse<IPlaceInner[]>>(ENDPOINT_PLACE_TYPE, {}).then(res => {
            setPlaceType(res?.result)
        })
        httpApi.get<IResponse<IPlaceInner[]>>(ENDPOINT_STATE_PRESERVATION, {}).then(res => {
            setStatePreservition(res?.result)
        })
        httpApi.get<IResponse<{ id: ID, name: string }[]>>(ENDPOINT_EXPEDITION_TYPE, {}).then(res => {
            setExpeditionType(res?.result)
        })
        httpApi.get<IResponse<IPlaceInner[]>>(ENDPOINT_PERIOD, {}).then(res => {
            setPeriods(res?.result)
        })
    }, [t])

    useEffect(() => {
        if (place) {
            setValue('id', id)
            setValue('name', place.name)
            setValue('secondName', place.secondName)
            setValue('coordinateX', decimalToDMS(place.coordinateX, false))
            setValue('coordinateY', decimalToDMS(place.coordinateY, true))
            setValue('area', place.area)
            setValue('height', place.height)
            setValue('informer', place.informer)
            setValue('provinceId', place.province.id)
            setValue('districtId', place.district.id)
            setValue('typeOfPlaceId', place.typeOfPlace.id)
            setValue('isSurronded', place.securityInformation.isSurronded)
            setValue('hasInformationBoard', place.securityInformation.hasInformationBoard)
            setValue('hasCadastralDoc', place.securityInformation.hasCadastralDoc)
            setValue('hasPrimaryStudy', place.learningOfHistory.hasPrimaryStudy)
            setValue('isPlanographic', place.learningOfHistory.isPlanographic)
            setValue('isShurf', place.learningOfHistory.isShurf)
            setValue('description', place.description)
            setValue('source', place.source)
            setValue('stateOfPreservationId', place.stateOfPreservation?.id)
            setValue('expeditionTypeId', place.expeditionType.id)
            setValue('periods', place.periods.map(item => item.id))
        }

    }, [place, t])

    return <div className="place-form">
        <Divider orientation="left">
            <h4>{place?.name ? `${place.name.slice(0, 100)} ...` : `${t('new')} ${t('place').toLowerCase()} ${t('add').toLowerCase()} `}</h4>
        </Divider>
        <form onSubmit={handleSendForm}>
            <Row gutter={20} className="form-item">
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={`Yodgorlik nomi`} name={PLACE_NAME} label={t('place_name')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={`Yodgorlik nomi`} name={PLACE_SECOND_NAME} label={t('second_name')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={`E60°43'28.8432"`} name={PLACE_COORDINATEY} label={t('coordintateX')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={`2.6`} name={PLACE_AREA} label={t('area')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={`N41°16'36.0632"`} name={PLACE_COORDINATEX} label={t('coordintateY')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={`5`} name={PLACE_HEIGHT} label={t('height')} />
                </Col>
                <Col xs={24} md={12}>
                    <TextFieldController control={control} placeholder={t('informer')} name={PLACE_INFORMER} label={t('informer')} />
                </Col>
                <Col xs={24}>
                    <TextFieldController
                        inputCompound={'TextArea'}
                        rows={5}
                        control={control}
                        name={PLACE_DESCRIPTION}
                        label={t("description")} />
                </Col>
                <Col xs={24}>
                    <TextFieldController
                        inputCompound={'TextArea'}
                        rows={5}
                        control={control}
                        name={PLACE_SOURCE}
                        label={t("source")} />
                </Col>
            </Row>
            <Divider />
            <Row gutter={20}>

                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={province?.map(item => ({ value: item.id, label: item.name })) || []}
                        setValue={setValue}
                        placeholder={t('province')}
                        label={t('province')}
                        name={PLACE_PROVINCE}
                        control={control}></SelectController>

                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={district?.map(item => ({ value: item.id, label: item.name })) || []}
                        setValue={setValue}
                        placeholder={t('district')}
                        label={t('district')}
                        name={PLACE_DISTRICT}
                        control={control}></SelectController>
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={placeType?.map(item => ({ value: item.id, label: item.nameUz })) || []}
                        setValue={setValue}
                        placeholder={t('typeOfPlace')}
                        label={t('typeOfPlace')}
                        name={PLACE_TYPE_OF_PLACE}
                        control={control}></SelectController>
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={statePreservition?.map(item => ({ value: item.id, label: item.nameUz })) || []}
                        setValue={setValue}
                        placeholder={t('state_of_preservation')}
                        label={t('state_of_preservation')}
                        name={PLACE_STATE_OF_PRESERVATION}
                        control={control}></SelectController>
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        items={expeditionType?.map(item => ({ value: item.id, label: item.name })) || []}
                        setValue={setValue}
                        placeholder={t('expeditionType')}
                        label={t('expeditionType')}
                        name={PLACE_EXPEDITION_TYPE}
                        control={control}></SelectController>
                </Col>
                <Col xs={24} md={12}>
                    <SelectController
                        style={{ width: '100%' }}
                        mode="multiple"
                        items={periods?.map(item => ({ value: item.id, label: item.nameUz })) || []}
                        setValue={setValue}
                        placeholder={t('periods')}
                        defaultValue={place?.periods.map(item => item.id)}
                        label={t('periods')}
                        name={PLACE_PERIODS}
                        control={control}></SelectController>
                </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
                <Col xs={24} md={6} >
                    <SwitchController setValue={setValue}
                        control={control}
                        name={PLACE_SURRONDED}
                        label={t('isSurronded')} />
                    <SwitchController setValue={setValue}
                        control={control}
                        name={PLACE_INFROMATION_BOARD}
                        label={t('hasInformationBoard')} />
                    <SwitchController setValue={setValue}
                        control={control}
                        name={PLACE_CADASTRAL_DOC}
                        label={t('hasCadastralDoc')} />
                </Col>

                <Col xs={24} md={6} >
                    <SwitchController setValue={setValue}
                        control={control}
                        name={PLACE_PRIMARY_STUDY}
                        label={t('hasPrimaryStudy')} />
                    <SwitchController setValue={setValue}
                        control={control}
                        name={PLACE_SHURF}
                        label={t('isShurf')} />
                    <SwitchController setValue={setValue}
                        control={control}
                        name={PLACE_PLONAGRAPHIC}
                        label={t('isPlanographic')} />
                </Col>

                <Col xs={24}>
                    <ImageUploader oldImages={place?.images || []} setValue={setValue} multiple={true} path="images/upload" name="images" />
                </Col>
            </Row>
            {contexHolder}
            <Button className="send-button" disabled={isLoading} type="primary" htmlType="submit">{t('save')}</Button>
        </form>
    </div >
}