import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ColumnType } from "antd/es/table";
import { Button, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IStudent } from "../../models";
import { ROUTE_BACKEND_HOME, ROUTE_STUDENTS } from "../../../../common/constants/route.constants";
import { DataTable } from "../../../../common/data-table";
import './sytles.scss';


export const StudentsListBackend: FC<{
    isLoading: boolean;
    list: IStudent[];
    onDelete: (id: any) => void,
    // onPrivate: (id: any, value: boolean) => void,
    // isActing: boolean,
    isDeleting: boolean,
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_STUDENTS}/${value.id}`)
    }


    const columns = useMemo(() => [
        {
            title: t('full_name'),
            dataIndex: "fullName",
            key: "fullName",
            width: 500,
            className: "name-column"
        },
        {
            title: t('grade'),
            dataIndex: "grade",
            key: "grade",
            render: (item: any) => item?.name,
            width: 100,

        },
        {
            title: t('class'),
            dataIndex: "class",
            key: "class",
            render: (item: any) => item?.name,
            width: 100,
        },

        // PrivateColumnType(isActing, onPrivate),

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