import Cookies from 'js-cookie'

const TokenKey = 'isLogged';

export const getToken = () => {
    return Cookies.get(TokenKey);
};

export const setToken = () => {
    Cookies.set('isLogged', true);
};

export const removeToken = () => {
    return Cookies.remove(TokenKey);
};

export const getStorage = name => {
    let sessionStr = window.localStorage.getItem(name) || undefined;
    if (sessionStr) {
        sessionStr = JSON.parse(sessionStr);
    }
    return sessionStr;
}

export const setStorage = (name, data) => {
    if (name && data) {
        window.localStorage.setItem(name, JSON.stringify(data));
    }
}

export const removeStorage = name => {
    if (name) {
        window.localStorage.removeItem(name);
    }
}
