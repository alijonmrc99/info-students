import { useEffect } from 'react';
import { useAppDispatch } from '../../../store';
import { meSlice } from '../slices';
import { useNavigate } from 'react-router-dom';

export const useLogOut = () => {
    const dispatch = useAppDispatch();
    localStorage.removeItem('role');
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(meSlice.actions.emptyState());

    }, [dispatch]);

    navigate('/login');
};
