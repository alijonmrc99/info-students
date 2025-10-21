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
                        <h1>Samarqand shahridagi
                            Prezident maktabi websayti</h1>
                        <p className="title-bottom">Prezident maktabi o'quvchilari haqida ma'lumotlar web sayti
                            bu saytda siz o'quchilarning erishgan yutyqlari, sinflari va boshqa ko'plab ma'lumotlarni topishingiz mumkin.
                        </p>
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