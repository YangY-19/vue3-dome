import { get } from '../axios/request'

export function getUserInfo (params) {
    return get({
        url: '/user/getUserInfo',
        params
    })
}


