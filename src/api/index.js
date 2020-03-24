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

export function getAllAbstractProject(data) {
  return request({
    url: `${ProManageAPIServer}project/getAllAbstractProjInfoList`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getDetailProjInfo(data) {
  return request({
    url: `${ProManageAPIServer}project/getDetailProjInfo`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function searchProject(data) {
  return request({
    url: `${ProManageAPIServer}project/search`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function delProject(data) {
  return request({
    url: `${ProManageAPIServer}project/deleteProject`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function createNewProject(data) {
  return request({
    url: `${ProManageAPIServer}project/createNewProject`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function editProject(data) {
  return request({
    url: `${ProManageAPIServer}project/editProject`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function isAuthenticated(data) {
  return request({
    url: `${ProManageAPIServer}project/isAuthenticated`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function searchMyProject(data) {
  return request({
    url: `${ProManageAPIServer}project/searchMyProject`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getReportNum(data) {
  return request({
    url: `${ProManageAPIServer}project/getReportNum`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function createReportNum(data) {
  return request({
    url: `${ProManageAPIServer}project/createReportNum`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function alterProjType(data) {
  return request({
    url: `${ProManageAPIServer}project/editProject/alterProjType`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getUserList(data) {
  return request({
    url: `${ProManageAPIServer}userManage/getUserList`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function addUser(data) {
  return request({
    url: `${ProManageAPIServer}userManage/addUser`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteUser(data) {
  return request({
    url: `${ProManageAPIServer}userManage/deleteUser`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function alterUserInfo(data) {
  return request({
    url: `${ProManageAPIServer}userManage/alterUserInfo`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}