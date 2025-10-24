import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IPaginationData, PaginationDataContext } from "../../common/contexts";
import { FlagOutlined, ProfileOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../store";
import { Menu } from "antd";
import { ROUTE_PERIODS, ROUTE_STUDENTS, ROUTE_PRESERVATIONS, ROUTE_TYPE_PLACE, ROUTE_USERS } from "../../common/constants/route.constants";

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
            key: ROUTE_PERIODS,
            icon: <FlagOutlined />,
            label: t('periods'),
            roles: []
        },
        {
            key: ROUTE_PRESERVATIONS,
            icon: <SnippetsOutlined />,
            label: t('state_of_preservation'),
            roles: []
        },
        {
            key: ROUTE_TYPE_PLACE,
            icon: <SnippetsOutlined />,
            label: t('typeOfPlace'),
            roles: []
        },
        {
            key: ROUTE_USERS,
            icon: <UserOutlined />,
            label: t('users'),
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