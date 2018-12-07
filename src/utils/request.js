import Axios from 'axios';
import {Message} from "element-ui";
import config from './axiosConfig';

const service = Axios.create(config);

service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
});

service.interceptors.response.use(
    response => response,
    errror => {
        Message({
            message: errror.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(errror);
    });

export default service
