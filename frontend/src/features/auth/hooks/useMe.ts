import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchMe } from '../thunks';

export const useMe = () => {
    const dispatch = useAppDispatch();
    const { result, isLoading } = useAppSelector((state) => state.me);
    const isAuthorized = !!result;
    localStorage.setItem('role', result?.role ? result.role : '');
    useEffect(() => {
        if (!result && !isLoading) {
            dispatch(fetchMe());
        }
    }, [dispatch]);

    return { result, isLoading, isAuthorized };
};
