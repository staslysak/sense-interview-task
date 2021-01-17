import axios from 'axios';
import { notification } from 'antd';

import store from './store';
import { xml2js } from './utils';
import { logoutAction } from './redux/auth/actions';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'text/xml',
    },
});

api.interceptors.response.use(
    (res) => {
        return xml2js(res.data);
    },
    (err) => {
        if (err.response.status === 403) {
            store.dispatch(logoutAction());
            return Promise.reject(err);
        }

        const { message } = xml2js(err.response.data).root;

        notification.error({
            message: 'Error',
            description: message._text,
        });

        return Promise.reject(err);
    }
);

export default api;
