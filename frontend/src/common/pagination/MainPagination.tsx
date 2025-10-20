import { Pagination, PaginationProps } from "antd";
import { FC, useEffect } from "react";

import './styles.scss';
import { useTranslation } from "react-i18next";

interface IPaginationProps {
    onChange: (values: any) => void,
    total?: number,
    perPage?: number,
    defaultCurrent?: number,
}

export const defaultPaginationData = { page: 0, perPage: 30 };

export const MainPagination: FC<IPaginationProps> = ({ onChange, total = 1,
    perPage = defaultPaginationData.perPage, defaultCurrent = 1 }) => {
    useEffect(() => {
    }, [defaultCurrent])
    const { t } = useTranslation()
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Prev</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };
    return <div className="main-pagination">
        <Pagination
            total={total || 0}
            showTotal={(total, range) => `${range[0]}-${range[1]} ${t('from')} ${total}`}
            pageSize={perPage}
            showSizeChanger
            defaultCurrent={defaultCurrent}
            onChange={(page, perPage) => onChange({ perPage: perPage, page: page })
            }
            itemRender={itemRender}
        />
    </div>
}