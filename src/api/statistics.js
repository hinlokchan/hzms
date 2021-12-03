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

export function getDayReport(data, companyId) {
  return request({
    url: `${ProManageAPIServer}statistics/dayReport`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  });
}

export function getWeekReport(data, companyId) {
  return request({
    url: `${ProManageAPIServer}statistics/getWeekReport`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  });
}

export function getAllMission(data, companyId) {
  return request({
    url: `${ProManageAPIServer}statistics/missionLoad/getAll`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data),
  });
}

export function getUserDetailMission(data, companyId) {
  return request({
    url: `${ProManageAPIServer}statistics/missionLoad/getDetail`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data),
  });
}

export function getCurrentMission(data, companyId) {
  return request({
    url: `${ProManageAPIServer}statistics/missionLoad/getCurrentUser`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data),
  });
}
