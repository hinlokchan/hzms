/*
 * @Author: your name
 * @Date: 2020-05-21 10:59:55
 * @LastEditTime: 2020-05-21 18:07:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /hz-manage-system/src/api/statistics.js
 */

import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

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
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  });
}

export function getWeekReport(data) {
  return request({
    url: `${ProManageAPIServer}statistics/getWeekReport`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  });
}
