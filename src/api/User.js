import request from '@/utils/request';
import {getPorUrl} from "@/utils";

/**
 * 获取用户信息
 * @returns {*}
 */
export const getUserList = params => {
    return request.post(getPorUrl('users/getUserList'), params);
}

/**
 * 用户登录
 * @returns {*|void|AxiosPromise<any>}
 */
export const doLogin = params => {
    return request.post(getPorUrl('users/doLogin'), params);
}

/**
 * 获取用户详情
 * @param params
 * @returns {*}
 */
export const getUserInfoById = params => {
    return request.get(getPorUrl(`users/getById/${params}`))
}

/**
 * 删除用户信息
 * @param params
 * @returns {*|void|AxiosPromise<any>}
 */
export const delUserById = params => {
    return request.post(getPorUrl('users/delUserById'), params);
}

/**
 * 更新用户信息
 * @param params
 * @returns {*|void|AxiosPromise<any>}
 */
export const updateUserById = params => {
    return request.post(getPorUrl('users/updateUserById'), params)
}

/**
 * 新增用户信息
 * @param params
 * @returns {*|void|AxiosPromise<any>}
 */
export const addUserInfo = params => {
    return request.post(getPorUrl('users/addUserInfo'), params);
}
