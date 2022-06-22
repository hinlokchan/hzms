import request from '../utils/request2';
import qs from 'qs';
import Cookies from 'js-cookie';
import { host } from '@/config';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;

//第三方统一社会信用代码
export function getTyshxydm(query) {
  return request({
    url: `/tyshxydm/private-api/catalogSearch`,
    method: 'get',
	params: query
  });
}
