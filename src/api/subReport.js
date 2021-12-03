import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

export function addSubProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/addSubProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubProjectInfoList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/getSubProjList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function delSubProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/deleteSubProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}
