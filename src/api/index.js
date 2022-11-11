import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

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
  });
}

export function logout(data) {
  return request({
    url: `${ProManageAPIServer}user/logout`,
    method: 'post',
    data: qs.stringify(data)
  });
}

export function touch(data, companyId) {
  return request({
    url: `${ProManageAPIServer}user/isAuthenticated`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getAllAbstractProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/getAllAbstractProjInfoList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getDetailProjInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/getDetailProjInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function searchProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/search`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function delProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/deleteProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function createNewProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/createNewProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/editProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function isAuthenticated(data) {
  return request({
    url: `${ProManageAPIServer}user/isAuthenticated`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function searchMyProject(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/searchMyProject`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getReportNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/getReportNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function createReportNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/createReportNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function deleteReportNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/deleteReportNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function alterProjType(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/editProject/alterProjType`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getUserList(data) {
  return request({
    url: `${ProManageAPIServer}userManage/getUserList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function addUser(data) {
  return request({
    url: `${ProManageAPIServer}userManage/addUser`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function deleteUser(data) {
  return request({
    url: `${ProManageAPIServer}userManage/deleteUser`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}

export function alterUserInfo(data) {
  return request({
    url: `${ProManageAPIServer}userManage/alterUserInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
    method: 'post',
    data: qs.stringify(data)
  });
}

export function alterPassword(data) {
  return request({
    url: `${ProManageAPIServer}user/alterPassword`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubReportNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/getSubReportNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function addSubReportNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/addSubReportNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getOldReportNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/createPostMonthReportNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function setWorkAssignment(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/workAssignment`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getWorkAssignment(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/getWorkAssignment`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function setOldProject(data) {
  return request({
    url: `${ProManageAPIServer}project/oldProjectInput`,
    headers: {
      cookie: 'JSESSIONID' + Cookies.get('JSESSIONID'), 
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: JSON.stringify(data)
  });
}

export function createContractNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/createContractNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function updateExternalContractNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}contract/updateExternalContractNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function deleteContractNum(data, companyId) {
  return request({
    url: `${ProManageAPIServer}contract/deleteContractNum`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function userQuery(data) {
  return request({
    url: `${ProManageAPIServer}userManage/fuzzyQuery`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID')},
    method: 'post',
    data: qs.stringify(data)
  });
}


//委托人
export function getClientList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/getClientList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getRawClientList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/getRawClientList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getClientTypeList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/getClientTypeList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'get'
  });
}

export function addClient(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/addClient`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function deleteClient(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/deleteClient`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}


export function editClientInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/editClientInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getClientInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/getClientInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function changeClientType(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/changeClientType`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editClientName(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/editClientName`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function transferProj(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/transferProj`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}


//委托人申请新增
export function addClientNameChange(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/modifyApplication/submitApplication`, 
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//委托人申请修改
export function editClientNameChange(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/modifyApplication/editApplication`, 
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//委托人申请撤销
export function delClientNameChange(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/modifyApplication/withdrawApplication`, 
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//委托人申请信息
export function getClientNameChangeInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/modifyApplication/getApplicationListByClientId`, 
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//委托人申请列表
export function getClientNameChangeList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/modifyApplication/getApplicationList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//委托人申请审核
export function auditClientNameChange(data, companyId) {
  return request({
    url: `${ProManageAPIServer}client/modifyApplication/audit`, 
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//第三方统一社会信用代码
export function getTyshxydm(query) {
  return request({
    url: `/tyshxydm/private-api/catalogSearch`,
    method: 'get',
	params: query
  });
}

export function delWorkAssignment(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/deleteWorkAssignment`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//计划项目操作记录
export function opRecord(data, companyId) {
  return request({
    url: `${ProManageAPIServer}record/getProjOpRec`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//总审模块操作记录
export function chiefRecord(data, companyId) {
  return request({
    url: `${ProManageAPIServer}record/getSubProjOpRec`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function setProjState(data, companyId) {
  return request({
    url: `${ProManageAPIServer}project/updateProjState`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function createReportQrCode(data, companyId) {
  return request({
    url: `${ProManageAPIServer}qrCode/createReportQrCode`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getContractList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}contract/getContractList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function updateContractInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}contract/updateContractInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function createEvalObj(data, companyId) {
  return request({
    url: `${ProManageAPIServer}evalObj/createEvalObj`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function createSingleEvalObj(data, companyId) {
  return request({
    url: `${ProManageAPIServer}evalObj/createSingleEvalObj`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteEvalObjById(data, companyId) {
  return request({
    url: `${ProManageAPIServer}evalObj/deleteEvalObjById`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',	
	data: qs.stringify(data)
  })
}

export function getEvalObjListByProjId(data, companyId) {
  return request({
    url: `${ProManageAPIServer}evalObj/getEvalObjListByProjId`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',	
	data: qs.stringify(data)
  })
}


export var getProjInfoTable = 'statistics/getProjInfoTable';
