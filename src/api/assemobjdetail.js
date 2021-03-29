import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

export function getEvalObjDetail(data) {
  return request({
    url: `${ProManageAPIServer}evalObjDetail/get`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}

export function submitEvalObjDetail(data) {
  return request({
    url: `${ProManageAPIServer}evalObjDetail/add`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editEvalObjDetail(data) {
  return request({
    url: `${ProManageAPIServer}evalObjDetail/edit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}