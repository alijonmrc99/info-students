import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_AUTH_TOKEN } from '../../../common/constants/base.constants';
import { ROUTE_BACKEND_HOME } from '../../../common/constants/route.constants';

export const withGuest = (ComposedComponent: ComponentType) => (props: any) => {
    const token = localStorage.getItem(BASE_AUTH_TOKEN);
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            console.log(token);
            navigate(`${ROUTE_BACKEND_HOME}`); return;
        }
    }, [navigate, token])

    return <ComposedComponent {...props} />;
};
