import axios from 'axios'
import router from '../../router/index'
import { message } from '../../utils/ui'
import { DEV_URL, PROD_URL } from './base'

const BASEURL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

const instance = axios.create({
    baseURL: BASEURL,
    timeout: 5000
})

const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}
const monitorMessage = (err) => {
   return message({
       title: err
    })
}

const errorHandle = (status, error) => {
   // 状态码判断
   switch (status) {
    //未登录状态
    case 401:
        toLogin()
        break
    case 403:
    // 403 token过期
    // 清除token并跳转登录页
        monitorMessage("403: 登录过期，请重新登录")
        localStorage.removeItem("token")
        setTimeout(() => {
            toLogin()
        }, 1000)
        break
    case 404:
        monitorMessage("404: 请求资源未找到!")
        break
    case 500:
        monitorMessage("500: 服务器加载失败!")
        break
    default:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        monitorMessage(`其他错误信息: ${error}`)
    }
}

//设置post请求
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

// 添加请求拦截器
// 在请求发送之前做一些事
instance.interceptors.request.use(
    config => {
       const token = localStorage.getItem('token')
       token && (config.headers.common['Authorization'] = "Bearer " + token)
       return config
    },
    error => {
        return Promise.reject(error)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.state === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.resolve(response)
        }
    },
    error => {
        console.log(error)
        const { response } = error
        if (response) {
            // 相应错误处理: token 过期， 无权限访问， 路径不存在， 服务器问题等
            errorHandle(response.status, response.data.error)
            return Promise.reject(response)
        } else {
            return Promise.reject(error)
        }
    }
)

export default instance