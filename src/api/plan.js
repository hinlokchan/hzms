import request from '../utils/request';
import { host } from '@/config'
const ProManageAPIServer = `${host.baseUrl}/${host.pathUrl}`

// export const fetchData = query => {
//   return request({
//     url: './table.json',
//     method: 'get',
//     params: query
//   });
// };

export function addPlan(data) {
  return request({
    url: `${ProManageAPIServer}/addManageType`,
    method: 'post',
    data
  })
}