import { TODO_TYPES as TYPES } from './types';
import api from '../../api';
import { js2xml, getToken, setToken, removeToken } from '../../utils';

const loginAction = (payload) => ({ type: TYPES.login, payload });

export const performLogin = ({ username, password }) => (dispatch) => {
    api.post(
        '/login',
        js2xml({
            password,
            username,
        })
    ).then((res) => {
        setToken(res.root.accessToken._text);
        dispatch(loginAction(res.root));
    });
};

export const performSignup = ({ username, password }) => (dispatch) => {
    api.post(
        '/signup',
        js2xml({
            password,
            username,
        })
    ).then((res) => {
        setToken(res.root.accessToken._text);
        dispatch(loginAction(res.root));
    });
};

export const logoutAction = () => (dispatch) => {
    removeToken();
    dispatch({ type: TYPES.logout });
};

export const getSelf = () => (dispatch) => {
    api.get('/user', {
        headers: {
            authorization: getToken('Bearer'),
        },
    }).then((res) => {
        dispatch(loginAction(res));
    });
};

export const updateSelf = ({ username, password }) => (dispatch) => {
    api.put(
        '/user',
        js2xml({
            password,
            username,
        }),
        {
            headers: {
                authorization: getToken('Bearer'),
            },
        }
    ).then((res) => {
        dispatch({ type: TYPES.updateUser, payload: res.user });
    });
};

export const deleteSelf = () => (dispatch) => {
    api.delete('/user', {
        headers: {
            authorization: getToken('Bearer'),
        },
    }).then((res) => {
        dispatch(logoutAction());
    });
};
