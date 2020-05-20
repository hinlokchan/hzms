import request from '../utils/request';
import qs from 'qs'
import Cookies from 'js-cookie'
import { host } from '@/config'
const ProManageAPIServer = `${host.baseUrl}/${host.pathUrl}`

// export function getProjInfoTable(data) {
//   return request({
//     url: `${ProManageAPIServer}statistics/getProjInfoTable`,
//     headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }

export function getDayReport(data) {
  return request({
    url: `${ProManageAPIServer}statistics/dayReport`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  })
}

export function getWeekReport(data) {
  return request({
    url: `${ProManageAPIServer}statistics/getWeekReport`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  })
}