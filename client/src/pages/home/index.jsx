import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSelf } from '../../redux/auth/actions';
import css from './styles.module.scss';

const Home = () => {
    const dispatch = useDispatch();
    const authorized = useSelector((state) => state.auth.authorized);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (authorized && !user?.username) {
            dispatch(getSelf());
        }
    }, [authorized, user]);

    return (
        <div className={css['home-page']}>
            <h2>Welcome {user?.username?._text ?? ''}</h2>
        </div>
    );
};

export default Home;
