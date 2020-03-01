import axios from 'axios';
import {
    Message,
    MessageBox
} from 'element-ui'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.statusCode === '200') {
            return Promise.resolve(response.data)
        } else if (response.data.statusCode === '4003') {
            localStorage.removeItem('staffName')
            localStorage.removeItem('staffId')
            MessageBox.confirm(
                '你已被登出，可以取消继续留在该页面，或者重新登录',
                '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                location.reload()
            })
            // return Promise.reject(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(response.data);
    }
);

export default service;
