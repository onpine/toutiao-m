import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
Vue.filter('datetime', (value, format = 'YY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
