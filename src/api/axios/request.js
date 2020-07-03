import instance from './http'
import qs from 'qs';

function post({url, params}) {
      /**
       * post方法，对应post请求
       * @param {String} url [请求的url地址]
       * @param {Object} params [请求时携带的参数]
       */
      return new Promise((resolve, reject) => {
        instance
          .post(url, qs.stringify(params))
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.data)
          })
      })
  }

  function get({url, params}) {
      /**
       * get方法，对应get请求
       * @param {String} url [请求的url地址]
       * @param {Object} params [请求时携带的参数]
       */
      return new Promise((resolve, reject) => {
        instance
          .get(url, {
            params: params
          })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.data)
          })
      })
  }

  export {
    get,
    post
  }

