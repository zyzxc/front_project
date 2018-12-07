import qs from 'qs';

const AxiosConfig = {
    baseURL: '',
    transformResponse: [function (data) {
        return data;
    }],
    paramsSerializer: params => {
        return qs.stringify(params);
    },
    timeout: 5000,
    withCredentials: false,
    responseType: 'text',
    xsrfCookieName: 'XSRF-TOKET',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxRedirects: 5,
    maxContentLength: 2000,
    validateStatus: status => {
        return status >= 200 && status < 500
    }
};

export default AxiosConfig
