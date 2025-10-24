import { FC, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { IPaginationData, IPlaceFilterData, PaginationDataContext, PlaceFilterContext } from '../../../common/contexts';
import { httpApi } from '../../../App';
import { MainPagination } from '../../../common/pagination';
import { PlaceFilter } from '../../../components/palce-filter/PlaceFIlter';
import { StudentsListBackend } from '../../../features/students-list/components/students-list/StudentsList';
import { ENDPOINT_STUDENTS } from '../../../features/students-list/endpoints';
import { fetchAllStudents } from '../../../features/students-list/thunks';


export const Students: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    // const [isActing, setIsActing] = useState(false);
    const { result, isLoading } = useAppSelector(state => state.students);
    const [modal, contexHolder] = Modal.useModal();
    const { pagination, setPagination } = useContext(PaginationDataContext) as IPaginationData
    const { filter } = useContext(PlaceFilterContext) as IPlaceFilterData
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
        httpApi.delete(`${ENDPOINT_STUDENTS}/${id}`, {})
            .then(() => {
                dispatch(fetchAllStudents({ ...pagination, filter }))
            })
            .finally(() => {
                setIsDeleting(false)
            })
    }

    // const onPrivate = (id: string, value: boolean) => {
    //     setIsActing(true);
    //     httpApi.put(`${ENDPOINT_STUDENTS}/${id}`, { isPrivate: value })
    //         .then(() => {
    //             // dispatch(placesSlice.actions.toggleIsPrivate({ id }))

    //         }).catch(err => {
    //             dispatch(notificationSlice.actions.open({ message: err.response.data.message, type: "error" }))
    //         }
    //         ).finally(() => {
    //             setIsActing(false)
    //         })
    // }

    const onChange = (data: any) => setPagination(data)

    useEffect(() => {
        dispatch(fetchAllStudents({ ...pagination, ...filter }))
    }, [t, pagination, filter])




    return <div className='news-admin'>
        {contexHolder}

        <Flex className='news-header' justify='space-between'>
            <h3>{t('table_of_places')}</h3>
            <div>
                <Button style={{ marginRight: "20px" }} type='primary' onClick={() => navigate('bulk-upload')}>{t("import_from_excel")}</Button>
                <Button type='primary' onClick={() => navigate('create')}>{t("add")}</Button>
            </div>
        </Flex>
        <PlaceFilter where='back' />
        <Flex justify='end'>
            <MainPagination
                onChange={onChange}
                total={result?.meta.total || 0}
                perPage={pagination.perPage}
                defaultCurrent={pagination.page}
            />
        </Flex> <br />
        <StudentsListBackend list={result?.data || []}
            // isActing={isActing}
            isDeleting={isDeleting}
            isLoading={isLoading}
            // onPrivate={onPrivate}
            onDelete={confirm} />

        <br /><Flex justify='end'>
            <MainPagination
                onChange={onChange}
                total={result?.meta.total || 0}
                perPage={pagination.perPage}
                defaultCurrent={pagination.page}
            />
        </Flex>

    </div>
}