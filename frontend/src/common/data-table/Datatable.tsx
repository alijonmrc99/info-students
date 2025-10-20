import { Table } from "antd";
import { FC } from "react";

// import './styles.scss';

interface IDataTableProps {
    columns: any[];
    data: any[];
    onSelectRow: (index: any, value: any) => void,
    isLoading?: boolean
}

export const DataTable: FC<IDataTableProps> = ({ columns, data, onSelectRow, isLoading }) => {

    return <div className="data-table">

        <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }}
            loading={isLoading}
            pagination={false}
            onRow={(record, rowIndex) => {
                return {
                    onClick: _event => onSelectRow(rowIndex, record),
                };
            }} />
        {data.length ? null : ''}
    </div>
}