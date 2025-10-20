import { ComponentType } from 'react';
import { useMe } from '../hooks';
import { ScreenOnBoarding } from '../../../common/screens/ScreenBoring';
import { ScreenSessionExpired } from '../../../common/screens/SessionExpired';


export const withAuthorized = (ComposedComponent: ComponentType) => (props: any) => {
    const { isAuthorized = true, isLoading } = useMe();

    if (isLoading) {
        return <ScreenOnBoarding />
    };

    if (!isAuthorized) {
        return <ScreenSessionExpired />
    };

    return <ComposedComponent {...props} />;
};
