import { host } from '@/config';
import { Loading,Message } from 'element-ui';
import { messages } from '../components/common/i18n';
const ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`;


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

export function downloadExcel(formData, path) {
    // const loading = this.$loading({
    //     lock: true,
    //     text: '下载中',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // })
    startLoading();
    var oReq = new XMLHttpRequest()
    // url参数为拿后台数据的接口
    oReq.open('POST', ProManageAPIServer + path, true)
    oReq.responseType = 'blob'
    oReq.onload = function (oEvent) {
        var content = oReq.response
        var elink = document.createElement('a')
        // name为后台返给前端的文件名，根据下载文件格式加后缀名，后缀名必须加，不然下载在本地不方便打开。
        var headers = oReq.getResponseHeader('content-disposition')
        const headers2 = headers.split(';')[1].split('=')[1].substr(10)
        elink.download = headers2
        elink.style.display = 'none'
        var blob = new Blob([content])
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
    }
    oReq.send(formData)
    oReq.onloadend = e => {
        if (oReq.status === 200) {
            setTimeout(function() {
                endLoading()
                Message.success('下载成功');
            }, 300);
        } else {
            setTimeout(function() {
                endLoading()
                Message.error('下载失败');
            }, 300);
        }
    };
}