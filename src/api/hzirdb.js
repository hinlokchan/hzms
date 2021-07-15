import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

export function caseSearch(data) {
    return request({
        url: `${ProManageAPIServer}hzirdb/search/all`,
        headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
        method: 'post',
        data: qs.stringify(data)
    });
}

export function getDocumentById(data) {
    return request({
        url: `${ProManageAPIServer}hzirdb/doc/getDocumentById`,
        headers: { cookie: 'JSESSIONID' + Cookies.get('JSESSIONID') },
        method: 'post',
        data: qs.stringify(data)
    });
}