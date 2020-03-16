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
    url: `${ProManageAPIServer}project/searchProject`,
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

export function addNewProject(data) {
  return request({
    url: `${ProManageAPIServer}project/add/addNewProject`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateProject(data) {
  return request({
    url: `${ProManageAPIServer}project/update/updateProject`,
    headers: {'cookie': 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getNewProjectNum(data) {
  return request({
    url: `${ProManageAPIServer}project/add/getNewProjectNum`,
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