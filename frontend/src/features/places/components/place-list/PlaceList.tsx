import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ColumnType } from "antd/es/table";
import { Button, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IStudents } from "../../models";
import { ROUTE_BACKEND_HOME, ROUTE_PLACES } from "../../../../common/constants/route.constants";
import { DataTable } from "../../../../common/data-table";
import './sytles.scss';
import { decimalToDMS } from "../../../../common/functions";


export const PlaceListBackend: FC<{
    isLoading: boolean;
    list: IStudents[];
    onDelete: (id: any) => void,
    onPrivate: (id: any, value: boolean) => void,
    isActing: boolean,
    isDeleting: boolean,
}> = ({ isActing, isLoading, list, onDelete, onPrivate, isDeleting }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_PLACES}/${value.id}`)
    }


    const columns = useMemo(() => [
        {
            title: t('place_name'),
            dataIndex: "name",
            key: "name",
            width: 500,
            className: "name-column"
        },
        {
            title: t('coordinateX'),
            dataIndex: "coordinateX",
            key: "coordinateX",
            render: (item: any) => decimalToDMS(item, false),
            width: 100,

        },
        {
            title: t('coordinateY'),
            dataIndex: "coordinateY",
            key: "coordinateY",
            render: (item: any) => decimalToDMS(item, true),
            width: 100,

        },

        PrivateColumnType(isActing, onPrivate),

        DeleteColumnType(isDeleting, onDelete)
    ], [])
    return <>
        <DataTable data={list} columns={columns} isLoading={isLoading} onSelectRow={onSelectRow} />
    </>
}

export const DeleteColumnType = (isDeleting: boolean, onDelete: (id: any) => void): ColumnType<any> => {
    return {
        title: "",
        width: 64,
        key: "action",
        fixed: "right",
        render: (item: any) => <Button
            disabled={isDeleting}
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
        />,
    }
}
export const PrivateColumnType = (isActing: boolean, onPrivate: (id: any, value: boolean) => void): ColumnType<any> => {
    return {
        title: "Public/Private",
        width: 64,
        key: "action",
        fixed: "right",
        render: (item: any) =>
            <Button onClick={(e) => {
                e.stopPropagation();;
            }}
                disabled={isActing}
                style={{ border: "none", outline: "none" }}
            >
                <Switch
                    checked={item.isPrivate}
                    onClick={() => { onPrivate(item.id, !item.isPrivate) }}
                />
            </Button>
    }
}   