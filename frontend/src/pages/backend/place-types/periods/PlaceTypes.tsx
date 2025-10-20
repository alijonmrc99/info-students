import { FC, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { httpApi } from '../../../../App';
import { ENDPOINT_PLACE_TYPE } from '../../../../common/constants/endpoind.constants';
import { fetchAllPlaceTypes } from '../../../../features/type-of-place/thunks';
import { PlacesTypeList } from '../../../../features/type-of-place/components/place-type-list/PlacesTypeList';


export const PlaceTypes: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { result, isLoading } = useAppSelector(state => state.place_types);
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
        httpApi.delete(`${ENDPOINT_PLACE_TYPE}/${id}`, {})
            .then(() => {
                dispatch(fetchAllPlaceTypes({}))
            })
            .finally(() => {
                setIsDeleting(false)
            })
    }



    useEffect(() => {
        dispatch(fetchAllPlaceTypes({}))
    }, [t,])


    return <div className='news-admin'>
        {contexHolder}

        <Flex className='news-header' justify='space-between'>
            <h3>{t('table_of_places')}</h3>
            <div>
                <Button type='primary' onClick={() => navigate('create')}>{t("add")}</Button>
            </div>
        </Flex>

        <PlacesTypeList list={result || []}
            isDeleting={isDeleting}
            isLoading={isLoading}
            onDelete={confirm} />

    </div>
}