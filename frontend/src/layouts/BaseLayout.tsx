import { FC, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import './styles.scss'
import { Flex, Layout } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import logo from '../assets/images/logo1.png';
import { IMenuData, MenuDataContext } from "../common/contexts";
import { Menu } from "../components/menu";
import { Footer } from "antd/es/layout/layout";


export const BaseLayout: FC = () => {

    const { menu, setMenu } = useContext(MenuDataContext) as IMenuData;
    return (
        <div className="main-layout">
            <div className="header">
                <Link to="/">
                    <Flex align="center">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <h2 className="site-name">Samarqand shahridagi <br />
                            Prezident maktabi</h2>
                    </Flex>
                </Link>
                <Menu />
                <button onClick={() => setMenu(!menu)} className="mobile-btn">
                    {
                        menu ?
                            <CloseOutlined style={{ color: "#fff", fontSize: "28px" }} /> :
                            <MenuOutlined style={{ color: "#fff", fontSize: "28px" }} />

                    }
                </button>
            </div>
            <Outlet />
            <Layout>
                <Footer className="footer">
                    Footer
                </Footer>
            </Layout>
        </div>
    )
}