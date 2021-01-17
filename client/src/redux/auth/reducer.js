import { TODO_TYPES as TYPES } from './types';
import { getToken } from '../../utils';

const DEFAULT_STATE = {
    user: {},
    authorized: getToken() ?? false,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case TYPES.login:
            return {
                ...state,
                authorized: true,
                user: payload.user,
            };
        case TYPES.logout:
            return {
                ...state,
                authorized: false,
                user: {},
            };

        case TYPES.updateUser:
            return {
                ...state,
                user: { ...state.user, ...payload },
            };
        default:
            return state;
    }
};
