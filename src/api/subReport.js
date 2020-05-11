import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.pathUrl}`;

export function addSubProject(data) {
  return request({
    url: `${ProManageAPIServer}subProject/addSubProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubProjectInfoList(data) {
  return request({
    url: `${ProManageAPIServer}subProject/getSubProjectInfoList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}

export function delSubProject(data) {
  return request({
    url: `${ProManageAPIServer}subProject/deleteSubProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}
