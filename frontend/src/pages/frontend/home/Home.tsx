import { Col, Row } from "antd";
import { FC } from "react";
import { HomeImages } from "../../../components/home-images";
import './styles.scss';

export const Home: FC = () => {



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
                    </div>
                </Col>
                <Col xs={24} xl={12}>
                    <HomeImages />
                </Col>
            </Row>
        </div>
    )
}