import axios from 'axios';
import { Loading } from 'element-ui'
import {
    Message,
    MessageBox
} from 'element-ui'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 60000
});

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.7)'
  })
}
function endLoading() {
    loading.close()
}

service.interceptors.request.use(
    config => {
        startLoading()
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        console.log('response.data.statusCode', response.data)
        if (response.data.statusCode === '200') {
            endLoading()
            return Promise.resolve(response.data)
        } else if (response.data.statusCode === '4003') {
            localStorage.removeItem('staffName')
            localStorage.removeItem('staffId')
            MessageBox.confirm(
                '登录过期，请重新登录',
                '确定登出', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }
            ).then(() => {
                location.reload()
            })
            // return Promise.reject(response.data);
        } else {
            endLoading()
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(response.data);
    }
);

export default service;
