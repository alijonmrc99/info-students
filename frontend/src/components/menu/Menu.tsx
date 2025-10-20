import { FC, useContext } from "react";
import "./styles.scss";
import { Col, Row } from "antd";
import { Language } from "../language";
import { IMenuData, MenuDataContext } from "../../common/contexts";
import { Link } from "react-router-dom";
import { ROUTE_ABOUT, } from "../../common/constants/route.constants";
import { useTranslation } from "react-i18next";

export const Menu: FC = () => {
    const { menu } = useContext(MenuDataContext) as IMenuData;
    const { t } = useTranslation();
    return (
        <div>
            <Row style={menu ? { right: 0 } : {}} className={`menu`} align={'middle'}>
                <Col className="menu-item">
                    <Link to={ROUTE_ABOUT}>{t("about")}</Link>
                </Col>
                <Col> <Language /></Col>
            </Row>
        </div>

    );
};
