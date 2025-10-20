import { Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { HomeImages } from "../../../components/home-images";
import SlotCounter from 'react-slot-counter';
import './styles.scss';
import { httpApi } from "../../../App";
import { IResponse } from "../../../common/models";
import { ENDPOINT_STATISTICS } from "../../../common/constants/endpoind.constants";

export const Home: FC = () => {

    const [statistics, setStatistics] = useState<{ total: number, destroyedPlaceCount: number, planographicPlaceCount: number }>({
        total: 0,
        planographicPlaceCount: 0,
        destroyedPlaceCount: 0
    });

    useEffect(() => {
        httpApi.get<IResponse<{ total: number, destroyedPlaceCount: number, planographicPlaceCount: number }>>(ENDPOINT_STATISTICS, {})
            .then(res => {
                setStatistics(res.result)
            })
    }, [])

    return (
        <div className="main-container">
            <Row className="main-body">
                <Col xs={24} xl={12} className="main-body-text">
                    <div>
                        <h1>O’zbekiston
                            arxeologik yodgorliklar
                            xaritasi websayti</h1>
                        <p className="title-bottom">Oʻzbekiston – boy tarix va madaniyatga ega boʻlgan qadimiy yurt. Ushbu vebsayt sizga mamlakatimizdagi arxeologik yodgorliklar haqida ma’lumot berish, ularning joylashuvi va tarixi bilan tanishtirish uchun yaratilgan. Xarita orqali siz Oʻzbekistonning turli hududlarida joylashgan qadimiy shaharlar, ibodatxonalar, qal’alar va boshqa tarixiy obidalar bilan tanishishingiz mumkin.</p>
                        <Row justify="space-between">
                            <Col xs={6} className="couter">
                                <p className="counter-number"><SlotCounter value={statistics?.total} /></p>

                                <p className="counter-text">Barcha yodgorliklar</p>
                            </Col>
                            <Col xs={6} className="couter">
                                <p className="counter-number"><SlotCounter value={statistics?.destroyedPlaceCount} /></p>
                                <p className="counter-text">Dala tadqitiot o'tkazilgan</p>
                            </Col>
                            <Col xs={6} className="couter">
                                <p className="counter-number"><SlotCounter value={statistics?.planographicPlaceCount} /></p>
                                <p className="counter-text">Buzilgan yodgorliklar</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={24} xl={12}>
                    <HomeImages />
                </Col>
            </Row>
        </div>
    )
}