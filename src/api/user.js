/**
 * 用户请求相关
 */
import request from '@/utils/request.js'

/**
 * 用户登录
 */
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
/**
 * 获取验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
