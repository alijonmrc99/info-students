import { FC, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { httpApi } from '../../../App';
import { ENDPOINT_POSTS } from '../../../features/periods/endpoints';
import { fetchAllPosts } from '../../../features/periods/thunks';
import { PostListBackend } from '../../../features/periods/components/posts-list/PostsList';
import { IPaginationData, PaginationDataContext } from '../../../common/contexts';
import { MainPagination } from '../../../common/pagination';


export const Posts: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { result, isLoading } = useAppSelector(state => state.posts);
    const [modal, contexHolder] = Modal.useModal();
    const { pagination, setPagination } = useContext(PaginationDataContext) as IPaginationData

    const onChange = (data: any) => setPagination(data)
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
        httpApi.delete(`${ENDPOINT_POSTS}/${id}`, {})
            .then(() => {
                dispatch(fetchAllPosts({ ...pagination }))
            })
            .finally(() => {
                setIsDeleting(false)
            })
    }

    useEffect(() => {
        dispatch(fetchAllPosts({ ...pagination }))
    }, [t, pagination])

    return <div className='news-admin'>
        {contexHolder}

        <Flex className='news-header' justify='space-between'>
            <h3>{t('posts')}</h3>
            <div>
                <Button type='primary' onClick={() => navigate('create')}>{t("add")}</Button>
            </div>
        </Flex>
        <Flex justify='end'>
            <MainPagination
                onChange={onChange}
                total={result?.meta.total || 0}
                perPage={pagination.perPage}
                defaultCurrent={pagination.page}
            />
        </Flex>
        <PostListBackend list={result?.data || []}
            isDeleting={isDeleting}
            isLoading={isLoading}
            onDelete={confirm} />

    </div>
}