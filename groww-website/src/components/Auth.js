import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from 'src/components/SplashScreen';
import { setUserData, logout } from 'src/actions/account';
import authService from 'src/services/authService';

function Auth({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const initAuth = async () => {
            authService.setAxiosInterceptors({
                onLogout: () => dispatch(logout())
            });

            authService.handleAuthentication();

            if (authService.isAuthenticated()) {
                const user = await authService.loginInWithToken();
                await dispatch(setUserData(user));
            }

            setLoading(false);
        };

        initAuth();
    }, [dispatch]);

    if (isLoading) {
        return <SplashScreen />;
    }

    return children;
}

Auth.propTypes = {
    children: PropTypes.any
};

export default Auth;
