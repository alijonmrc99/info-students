import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IPreservation } from "../../models";
import { ROUTE_BACKEND_HOME, ROUTE_PRESERVATIONS } from "../../../../common/constants/route.constants";
import { DataTable } from "../../../../common/data-table";
import './sytles.scss';


export const PreservationList: FC<{
    isLoading: boolean;
    list: IPreservation[];
    onDelete: (id: any) => void,
    isDeleting: boolean,
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_PRESERVATIONS}/${value.id}`)
    }


    const columns = useMemo(() => [
        {
            title: t('id'),
            dataIndex: "id",
            key: "id",
            width: 100
        },
        {
            title: t('name'),
            dataIndex: "nameUz",
            key: "nameUz",

        },


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
