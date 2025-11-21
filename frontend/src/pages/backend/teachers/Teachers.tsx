import { FC, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { httpApi } from '../../../App';
import { TeacherList } from '../../../features/teachers/components/teacher-list/TeacherList';
import { fetchAllTeachers } from '../../../features/teachers/thunks';
import { ENDPOINT_TEACHER } from '../../../features/teachers/endpoints';


export const Teachers: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { result, isLoading } = useAppSelector(state => state.teachers);
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
        httpApi.delete(`${ENDPOINT_TEACHER}/${id}`, {})
            .then(() => {
                dispatch(fetchAllTeachers({}))
            })
            .finally(() => {
                setIsDeleting(false)
            })
    }



    useEffect(() => {
        dispatch(fetchAllTeachers({}))
    }, [t,])


    return <div className='news-admin'>
        {contexHolder}

        <Flex className='news-header' justify='space-between'>
            <h3>{t('teachers')}</h3>
            <div>
                <Button type='primary' onClick={() => navigate('create')}>{t("add")}</Button>
            </div>
        </Flex>

        <TeacherList list={result || []}
            isDeleting={isDeleting}
            isLoading={isLoading}
            onDelete={confirm} />

    </div>
}