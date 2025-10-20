import { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


import { useDispatch } from 'react-redux';
// import './styles.scss';
import { ROUTE_LOGIN } from '../constants/route.constants';
import { BASE_AUTH_TOKEN } from '../constants/base.constants';
import { meSlice } from '../../features/auth/slices';

export const ScreenSessionExpired: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(meSlice.actions.emptyState());
        localStorage.removeItem(BASE_AUTH_TOKEN);
        navigate(`${ROUTE_LOGIN}`);
    };

    return (
        <div className='board'>
            <p>Your session is expired. Please, go to login page</p>
            <Button onClick={handleLogout}>
                Login
            </Button>
        </div>
    );
};
