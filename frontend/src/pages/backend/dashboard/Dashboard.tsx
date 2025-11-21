import { FC, useState } from 'react';
import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex, Layout, MenuProps } from 'antd';
import logo from '../../../assets/images/logo.png';
import './styles.scss'

import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withAuthorized } from '../../../features/auth/hocs';
import { clearBearerToken } from '../../../common/axios';
import { Notifacation } from '../../../common/notification';
import { Language } from '../../../components/language';
import { MainMenuBackend } from '../../../components/backend-menu';
import { ROUTE_LOGIN } from '../../../common/constants/route.constants';
import { useAppDispatch } from '../../../store';
import { meSlice } from '../../../features/auth/slices';

const { Header, Sider, Content } = Layout;

export const Backend: FC = withAuthorized(() => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const items: MenuProps['items'] = [
        {
            label: < div ><LogoutOutlined /> {t('exit')}</div>,
            key: 'exit'
        }
    ];
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === "exit") {
            dispatch(meSlice.actions.emptyState())
            clearBearerToken();
            navigate(ROUTE_LOGIN);

        }
    }
    return (
        <Layout className='admin-page'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" >
                    <img className='logo-image' src={logo} alt="logo" />
                    <h2 style={{ display: `${collapsed ? "none" : "block"}` }} className='site-name'>Samarqand shahridagi <br /> Prezident maktabi</h2>
                </div>
                <MainMenuBackend />
            </Sider>
            <Layout>
                <Header className='header'>

                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '25px',
                            width: 64,
                            height: 64,
                            color: '#fff'
                        }}
                    />
                    <Flex>
                        <Language />
                        <Dropdown className="lang" menu={{ items, onClick }} trigger={['click']}>
                            <div className="current-lang"><UserOutlined /> <div className='admin_menu'>Admin</div>  <DownOutlined /></div>
                        </Dropdown>
                    </Flex>

                </Header>
                <Content className='content'>
                    <Outlet />
                </Content>
            </Layout>
            <Notifacation />
        </Layout >
    );
})