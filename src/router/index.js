import Vue from 'vue';
import Router from 'vue-router';
import { isAuthenticated } from '@/api/index';

Vue.use(Router);
let role = localStorage.getItem('role')
if(!role){
    let role = localStorage.getItem('role')
}
console.log('role>>>>>>>', role)
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/plan',
                    component: () => import('../components/page/Plan.vue'),
                    meta: { title: '项目管理' }
                },
                {
                    path: '/planform',
                    component: () => import('../components/page/PlanForm.vue'),
                    meta: { title: '表单' }
                },
                {
                    path: '/projcheck',
                    component: () => import('../components/page/ProjCheck.vue'),
                    meta: { title: '项目详情' }
                },
                {
                    path: '/workbranch',
                    component: () => import('../components/page/WorkBranch.vue'),
                    meta: { title: '工作台' }
                },
                {
                    path: '/oldplanform',
                    component: () => import('../components/page/OldPlanForm.vue'),
                    meta: { title: '旧项目录入' }
                },
                {
                    path: '/formalreg',
                    component: () => import('../components/page/FormalReg.vue'),
                    meta: { title: '正评登记' }
                },
                {
                    path: '/workhandle',
                    component: () => import('../components/page/WorkHandle.vue'),
                    meta: { title: '项目工作管理' }
                },
                {
                    path: '/subworkhandle',
                    component: () => import('../components/page/SubWorkHandle.vue'),
                    meta: { title: '子项目工作管理' }
                },
                {
                    path: '/stat',
                    component: () => import('../components/page/Stat.vue'),
                    meta: { title: '统计管理' }
                },
                {
                    path: '/client',
                    component: () => import('../components/page/Client.vue'),
                    meta: { title: '维护' }
                },
                {
                    path: '/usermanage',
                    component: () => import('../components/page/UserManage.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/oprecord',
                    component: () => import('../components/page/OpRecord.vue'),
                    meta: { title: '操作记录' }
                },
                {
                    path: '/icon',
                    component: () => import('../components/page/Icon.vue'),
                    meta: { title: '图标' }
                },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
