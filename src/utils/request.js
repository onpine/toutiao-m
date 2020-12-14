import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
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
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数错误')
  } else if (status === 401) {
    // token无效
    const { user } = store.state
    if (!user || user.token) {
      return redirectLogin()
    }
    // 获取新token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 将新token更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      // 把失败的请求重新发出去
      return request(error.config)
    } catch (error) {
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有操作权限
    Toast.fail('没有操作权限')
  } else if (status === 500) {
    // 服务端异常
    Toast.fail('服务端异常，请稍后再试')
  }

  return Promise.reject(error)
})

function redirectLogin () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
