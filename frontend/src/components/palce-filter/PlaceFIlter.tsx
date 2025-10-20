import { FC, useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "antd";
import './styles.scss';
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { IPlaceFilter, IPlaceFilterData, PlaceFilterContext } from "../../common/contexts";
import { TextFieldController } from "../input/text-filed-controller";
import { SelectController } from "../input/select-controller";
import { httpApi } from "../../App";
import { ENDPOINT_PERIOD, ENDPOINT_PLACE_TYPE, ENDPOINT_PROVINCE, ENDPOINT_STATE_PRESERVATION } from "../../common/constants/endpoind.constants";
import { IPlaceInner, IProvinceAndDistrict, IResponse } from "../../common/models";

export const PlaceFilter: FC<{ where?: string }> = ({ where = "map" }) => {
    const { setFilter } = useContext(PlaceFilterContext) as IPlaceFilterData;
    const { t } = useTranslation();
    const [province, setProvince] = useState<IProvinceAndDistrict[]>([]);
    const [district, setDistrict] = useState<IProvinceAndDistrict[]>([]);
    const [placeType, setPlaceType] = useState<IPlaceInner[]>([]);
    const [statePreservition, setStatePreservition] = useState<IPlaceInner[]>([]);
    const [periods, setPeriods] = useState<IPlaceInner[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const defaultValues: IPlaceFilter = {}


    const { control, getValues, unregister, watch, setValue, handleSubmit } = useForm<IPlaceFilter>({
        defaultValues: defaultValues,
    })



    useEffect(() => {
        httpApi.get<IResponse<IProvinceAndDistrict[]>>(ENDPOINT_PROVINCE, {}).then((response) => {
            setProvince(response?.result)
        })
        httpApi.get<IResponse<IPlaceInner[]>>(ENDPOINT_STATE_PRESERVATION, {}).then(res => {
            setStatePreservition(res?.result)
        })
        httpApi.get<IResponse<IPlaceInner[]>>(ENDPOINT_PLACE_TYPE, {}).then(res => {
            setPlaceType(res?.result)
        })
        httpApi.get<IResponse<IPlaceInner[]>>(ENDPOINT_PERIOD, {}).then(res => {
            setPeriods(res?.result)
        })
    }, [])

    useEffect(() => {

        if (getValues("provinceId"))
            httpApi.get<IResponse<IProvinceAndDistrict>>(`${ENDPOINT_PROVINCE}/${getValues("provinceId")}`, {}).then(res => {
                setDistrict(res?.result?.districts)
            })
        unregister("districtId")

        if (getValues("provinceId") === undefined) {
            setDistrict([])
        }
    }, [watch("provinceId")])

    const checkEmptyValues = (object: any) => {
        for (const key in object) {
            if (!object[key])
                delete object[key]
        }
        return object
    }

    const onSubmit = (value: IPlaceFilter) => {
        if (typeof value.periodIds === "object") {
            value.periodIds = value.periodIds.join(",");
        }
        if (typeof value.stateOfPreservationId === "object") {

            value.stateOfPreservationIds = value.stateOfPreservationId?.join(",");
            delete value.stateOfPreservationId
        }

        setFilter({
            ...checkEmptyValues(value)
        })
    }


    return (
        <div className="filter-container">
            {
                where === "map" ? <Button onClick={() => { setVisible(!visible) }} className="filter-btn" type={visible ? "primary" : "default"} >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5ZM14 5H20M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM16 12H13M20 19H11M4 12H10M4 5L7 5M6 17C7.10457 17 8 17.8954 8 19C8 20.1046 7.10457 21 6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17Z" stroke={visible ? "#fff" : "#333"} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </Button>
                    : <h4>Filterlar</h4>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={20} align={'middle'} className={"place-filter-content " + (where === "map" ? visible ? "visible" : "" : "show-backend")}>
                    <Col xs={where === "map" ? 12 : 6} >
                        <div className="filter-label">{t('choose_province')}:</div>
                        <SelectController
                            items={province.map(item => ({ label: item.name, value: item.id }))}
                            control={control}
                            setValue={setValue}
                            name="provinceId"
                            placeholder={t('choose_province')}
                        />
                    </Col>
                    <Col xs={where === "map" ? 12 : 6} >
                        <div className="filter-label">{t('choose_district')}:</div>
                        <SelectController
                            items={district?.map(item => ({ label: item.name, value: item.id }))}
                            control={control}
                            setValue={setValue}
                            name="districtId"
                            placeholder={t('choose_district')}
                        />
                    </Col>
                    <Col xs={where === "map" ? 12 : 6} >
                        <div className="filter-label">{t('state_of_preservation')}:</div>
                        <SelectController
                            items={statePreservition?.map(item => ({ label: item.nameUz, value: item.id }))}
                            control={control}
                            mode="multiple"
                            setValue={setValue}
                            name="stateOfPreservationId"
                            placeholder={t('state_of_preservation')}
                        />
                    </Col>
                    <Col xs={where === "map" ? 12 : 6} >
                        <div className="filter-label">{t('typeOfPlace')}:</div>
                        <SelectController
                            items={placeType?.map(item => ({ label: item.nameUz, value: item.id }))}
                            control={control}
                            optionFilterProp="label"
                            setValue={setValue}
                            name="typeOfPlaceId"
                            placeholder={t('typeOfPlace')}
                        />
                    </Col>
                    <Col xs={where === "map" ? 12 : 6} >
                        <div className="filter-label">{t('periods')}:</div>
                        <SelectController
                            items={periods?.map(item => ({ label: item.nameUz, value: item.id }))}
                            control={control}
                            setValue={setValue}
                            mode="multiple"
                            name="periodIds"
                            placeholder={t('periods')}
                        />
                    </Col>
                    <Col xs={where === "map" ? 12 : 6} className="input-filter">
                        <div className="filter-label">{t('place_name')}:</div>
                        <div>
                            <TextFieldController
                                control={control}
                                name="name"
                                placeholder={t('place_name')}
                            />
                        </div>
                    </Col>
                    <Col xs={where === "map" ? 12 : 6}   >
                        <Row gutter={20} justify={'center'} align={'middle'}>
                            <Col xs={24} >
                                <Button
                                    htmlType="submit"
                                    style={{ width: "100%", marginTop: 12 }} type="primary"><SearchOutlined />{t('search')}</Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </form>
        </div>
    )
}