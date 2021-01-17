export const getToken = (prefix) => {
    const token = localStorage.getItem('_token');
    return prefix ? `${prefix} ${token}` : token;
};

export const setToken = (token) => {
    localStorage.setItem('_token', token);
};

export const removeToken = () => {
    localStorage.removeItem('_token');
};
