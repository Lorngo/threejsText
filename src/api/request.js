// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import jsonp from 'api/jsonp'
import { REQUEST_URL, REQUEST_PROXY_URL, ERR_Ok } from 'api/project.config'

/*********************创建一个axios实例*********************/
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded'//'application/json'
  }
})

/*********************当前模式*********************/
if (process.env.NODE_ENV == 'development') {//本地开发模式
  console.log("【本地开发模式】")
  // REQUEST_URL = '/api'
} else {//线上部署模式
  console.log("【线上部署模式】")
  // REQUEST_URLS = REQUEST_URL
}

/*********************请求拦截器*********************/
service.interceptors.request.use(
  config => {
    if (config.method === 'get') config.params = config._params
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

/*********************响应拦截器*********************/
service.interceptors.response.use(response => {
  // console.log("【响应拦截器】", response)
  if (response.status == ERR_Ok || response.data.status == ERR_Ok || response.data.data.status == ERR_Ok) {
    return response
  } else {
    return { status: 1001, message: `返回数据状态status状态不为${ERR_Ok}` }
  }
})

/*********************导出一个通用请求方法*********************/
export const api = (url, data, type = 'post', isQs = true, isUrl = 0, config) => {
  if (isUrl == 1 || (isUrl == 2 && process.env.NODE_ENV === 'production')) {
    url = `${REQUEST_URL}${url}`
  } else if (isUrl == 2) {
    url = `${REQUEST_PROXY_URL}${url}`
  }
  if (type === 'jsonp') {
    return jsonp(url, data).then(res => {
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    }) 
  } else {
    if (type !== 'post' && type !== 'get') return Promise.reject({ status: 1001, message: '请求方法不符合规范' }) 
    return service[type](url, type == 'post' ? (isQs ? qs.stringify(data) : data) : { _params: data }, config).then(res => {
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    }) 
  }
}