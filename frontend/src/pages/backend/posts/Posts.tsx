import { FC, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { httpApi } from '../../../App';
import { ENDPOINT_PERIODS } from '../../../features/periods/endpoints';
import { fetchAllPeriods } from '../../../features/periods/thunks';
import { PostListBackend } from '../../../features/periods/components/periods-list/PeriodsList';


export const Periods: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { result, isLoading } = useAppSelector(state => state.periods);
    const [modal, contexHolder] = Modal.useModal();

    const confirm = (id: string) => {
        modal.confirm({
            title: t('attention'),
            icon: <ExclamationCircleOutlined />,
            content: t('delete_confirmation'),
            okText: t('confirm'),
            cancelText: t('cancel'),
            onCancel: () => { },
            onOk: () => onDelete(id)
        })
    }

    const onDelete = (id: string,) => {
        setIsDeleting(true);
        httpApi.delete(`${ENDPOINT_PERIODS}/${id}`, {})
            .then(() => {
                dispatch(fetchAllPeriods({}))
            })
            .finally(() => {
                setIsDeleting(false)
            })
    }



    useEffect(() => {
        dispatch(fetchAllPeriods({}))
    }, [t,])


    return <div className='news-admin'>
        {contexHolder}

        <Flex className='news-header' justify='space-between'>
            <h3>{t('table_of_places')}</h3>
            <div>
                <Button type='primary' onClick={() => navigate('create')}>{t("add")}</Button>
            </div>
        </Flex>

        <PostListBackend list={result || []}
            isDeleting={isDeleting}
            isLoading={isLoading}
            onDelete={confirm} />

    </div>
}