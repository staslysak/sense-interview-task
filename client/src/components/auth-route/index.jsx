import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = ({
    forceProtect = true,
    fallback = '/login',
    ...props
}) => {
    const authorized = useSelector((state) => state.auth.authorized);

    return forceProtect ? (
        authorized ? (
            <Route {...props} />
        ) : (
            <Redirect to={fallback} />
        )
    ) : (
        <Route {...props} />
    );
};
