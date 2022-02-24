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

export function editSubProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/editSubProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubProjectInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/getSubProjInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function removeSubProjNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/removeSubProjNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubProjectRegisterInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/getRegisterInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function addSubProjectRegister(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/submit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editSubProjectRegister(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/edit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getRegisterList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/getRegisterList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}