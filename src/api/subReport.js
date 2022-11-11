import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

//子项目基本信息
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

export function getSubProjStatus(data, companyId) {
  return request({
    url: `${ProManageAPIServer}subProject/getSubProjStatus`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//子项目正评信息
export function getSubProjectRegisterInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/getRegisterInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//新增正评信息
export function addSubProjectRegister(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/submit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//修改正评信息
export function editSubProjectRegister(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/edit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//所有正评列表
export function getRawRegisterList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/getRawRegisterList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//财务待审核正评列表(包括开票的一级列表)
export function getManageRegisterList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/getRegisterList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//财务审核正评信息
export function auditSubProjectRegister(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/audit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//财务审核不通过工单列表
//subProjId
export function getWorkOrderList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}workOrder/getWorkOrderList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//财务审核不通过工单内容
//woId
export function getWorkOrderInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}workOrder/getWorkOrderInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//财务修改审核不通过工单内容
//woId woOrderContent
export function updateWorkOrderInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}workOrder/updateWoContent`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//财务修改审核不通过工单内容
//woId
export function delWorkOrderInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}workOrder/withdraw`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//开具凭证
export function editSubProjectReceiptIssue(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/receipt/issue`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}
//作废凭证
export function editSubProjectReceiptInvalidate(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/receipt/invalidate`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//收费
export function editSubProjectReceiptPay(data, companyId) {
  return request({
    url: `${ProManageAPIServer}registerManage/receipt/pay`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getRegisterList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/getRegisterList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//子项目正评临时信息
export function getSubProjectRegisterDraft(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/getDraft`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editSubProjectRegisterDraft(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/saveDraft`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//子项目收费底单信息
export function addSubProjectChargeDoc(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/chargeDoc/submit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editSubProjectChargeDoc(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/chargeDoc/edit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubProjectChargeDocInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/chargeDoc/getChargeDocInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getChargeDocList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/chargeDoc/getList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//凭证信息
export function addSubProjectReceipt(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/receipt/addReceipt`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editSubProjectReceipt(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/receipt/edit`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function delSubProjectReceipt(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/receipt/delete`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getReceiptList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/receipt/getReceiptList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getSubProjectReceiptInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/receipt/getReceiptInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//发票信息
export function getInvoiceTitleList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/invoice/getInvoiceTitleList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function addInvoiceTitle(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/invoice/addInvoiceTitle`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function editInvoiceTitle(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/invoice/editInvoiceTitle`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

export function getInvoiceTitleInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}register/invoice/getInvoiceTitle`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}


//总审审核列表, 按projId分组
export function getFinalReviewList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}finalReview/getFinalReviewList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//总审审核列表, 不分组
export function getRawFinalReviewList(data, companyId) {
  return request({
    url: `${ProManageAPIServer}finalReview/getRawFinalReviewList`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//总审审核子列表
export function getSubProjListWithReviewInfo(data, companyId) {
  return request({
    url: `${ProManageAPIServer}finalReview/getSubProjListWithReviewInfo`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}


//总审审核
export function auditReview(data, companyId) {
  return request({
    url: `${ProManageAPIServer}finalReview/auditReview`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}

//盖章
export function doStamp(data, companyId) {
  return request({
    url: `${ProManageAPIServer}finalReview/doStamp`,
    headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') , companyId: companyId},
    method: 'post',
    data: qs.stringify(data)
  });
}