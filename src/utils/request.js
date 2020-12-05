import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

export default request
