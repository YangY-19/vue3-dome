import { post } from '../axios/request'
export function login (params) {
    return post({
        url: '/user/login',
        params
    })
}
