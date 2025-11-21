import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IPaginationData, PaginationDataContext } from "../../common/contexts";
import { KeyOutlined, PaperClipOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../store";
import { Menu } from "antd";
import { ROUTE_POSTS, ROUTE_STUDENTS, ROUTE_TEACHERS, ROUTE_USERS } from "../../common/constants/route.constants";

export const MainMenuBackend: FC = () => {
    const { t } = useTranslation();

    const { pathname } = useLocation();
    const { result: user } = useAppSelector(state => state.me)



    const { setPagination } = useContext(PaginationDataContext) as IPaginationData;
    const navigate = useNavigate();
    const items = useMemo(() => [

        {
            key: ROUTE_STUDENTS,
            icon: <ProfileOutlined />,
            label: t('students'),
            role: ['ADMIN']
        },

        {
            key: ROUTE_USERS,
            icon: <UserOutlined />,
            label: t('users'),
            role: ['ADMIN']
        },
        {
            key: ROUTE_POSTS,
            icon: <PaperClipOutlined />,
            label: t('posts'),
            role: ['ADMIN', "TEACHER"]
        },
        {
            key: ROUTE_TEACHERS,
            icon: <KeyOutlined />,
            label: t('teachers'),
            role: ['ADMIN',]
        },

    ], [t]);

    const [menuItems, setMenuItems] = useState(items);

    const filterMenu = () => {


        setMenuItems(items?.filter(item => {
            return item.role.includes(String(localStorage?.role));

        }))
    };

    useEffect(() => {
        filterMenu()
    }, [user, t, localStorage.getItem('role')]);




    const onSelect = (selectedMenu: {
        key: string;
        selectedKeys: string[];
        keyPath: string[];
    }) => {
        setPagination({ page: 0, perPage: 30 });
        navigate(selectedMenu.keyPath.reverse().join("/"));
    };

    return <Menu
        expandIcon={""}
        theme="dark"
        mode="inline"
        defaultOpenKeys={[pathname?.split('/')[2]]}
        items={menuItems || []}
        onSelect={onSelect}
    />
}