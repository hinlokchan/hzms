import request from '../utils/request';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

export function getProjList4CFS() {
    return request({
        url: `${ProManageAPIServer}CFS/getProjList`,
        method: 'post'
    });
}

export function deliverProj(data) {
    return request({
        url: `${ProManageAPIServer}CFS/deliverProj`,
        method: 'post',
        data:qs.stringify(data)
    });
}