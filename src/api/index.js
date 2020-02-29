import request from '../utils/request';
import qs from 'qs'
import Cookies from 'js-cookie'
import { host } from '@/config'
const ProManageAPIServer = `${host.baseUrl}/${host.pathUrl}`

export const fetchData = query => {
  return request({
    url: './table.json',
    method: 'get',
    params: query
  });
};

export function login(data) {
  return request({
    url: `${ProManageAPIServer}user/login`,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function logout(data) {
  return request({
    url: `${ProManageAPIServer}user/logout`,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getAllProject(data) {
  return request({
    url: `${ProManageAPIServer}project/getAllProjectInfos`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function delProject(data) {
  return request({
    url: `${ProManageAPIServer}project/deleteProjectById`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}