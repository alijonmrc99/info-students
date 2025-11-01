import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IPaginationData, PaginationDataContext } from "../../common/contexts";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../store";
import { Menu } from "antd";
import { ROUTE_POSTS, ROUTE_STUDENTS, ROUTE_USERS } from "../../common/constants/route.constants";

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
            roles: []
        },

        {
            key: ROUTE_USERS,
            icon: <UserOutlined />,
            label: t('users'),
            roles: []
        },
        {
            key: ROUTE_POSTS,
            icon: <UserOutlined />,
            label: t('posts'),
            roles: []
        },

    ], [t]);

    const [menuItems, setMenuItems] = useState(items);

    const filterMenu = () => {


        setMenuItems(items?.filter(item => {
            if (!item.roles?.length) {
                return true;
            } else {
                // return user?.permissions
                //     .map((role) => role.permission)
                //     .some((role) => item.roles?.includes(role));
                return []
            }
        }))
    };

    useEffect(() => {
        filterMenu()
    }, [user, t]);

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