import Vue from 'vue';
import Router from 'vue-router';
import { isAuthenticated } from '@/api/index';

Vue.use(Router);
let role = localStorage.getItem('role')
if(!role){
    let role = localStorage.getItem('role')
}
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
                    meta: { title: '项目管理' , permission: true }
                },
                {
                    path: '/planform',
                    component: () => import('../components/page/PlanForm.vue'),
                    meta: { title: '项目计划录入表单' }
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
                    path: '/workbranchcheck',
                    component: () => import('../components/page/WorkBranchCheck.vue'),
                    meta: { title: '工作台处理' }
                },
                {
                    path: '/oldplanform',
                    component: () => import('../components/page/OldPlanForm.vue'),
                    meta: { title: '旧项目录入' }
                },
                // {
                //     path: '/formalreg',
                //     component: () => import('../components/page/FormalReg.vue'),
                //     meta: { title: '正评登记' }
                // },
                {
                    path: '/projstat',
                    component: () => import('../components/page/ProjStateStat.vue'),
                    meta: { title: '成员项目状态'  }
                },
                {
                    path: '/workhandle',
                    component: () => import('../components/page/WorkHandle.vue'),
                    meta: { title: '项目工作管理' }
                },
                {
                    path: '/worksubregister',
                    component: () => import('../components/page/WorkSubRegister.vue'),
                    meta: { title: '项目正评信息' }
                },
                {
                    path: '/worksubreceipt',
                    component: () => import('../components/page/WorkSubReceipt.vue'),
                    meta: { title: '项目凭证信息' }
                },
				/* 
                {
                    path: '/worksubregistercheck',
                    component: () => import('../components/page/WorkSubRegisterCheck.vue'),
                    meta: { title: '项目信息审核' }
                },
				 */
                // {
                //     path: '/subworkhandle',
                //     component: () => import('../components/page/SubWorkHandle.vue'),
                //     meta: { title: '子项目工作管理' }
                // },
                {
                    path: '/stat',
                    component: () => import('../components/page/Stat.vue'),
                    meta: { title: '统计管理' }
                },
                {
                    path: '/stat4Common',
                    component: () => import('../components/page/Stat4Common.vue'),
                    meta: { title: '统计管理' }
                },
                {
                    path: '/contract',
                    component: () => import('../components/page/ContractManage.vue'),
                    meta: { title: '合同管理' }
                },
                {
                    path: '/casesearchdock',
                    component: () => import('../components/page/CaseSearchDock.vue'),
                    meta: { title: '案例查询' }
                },
                // {
                //     path: '/client',
                //     component: () => import('../components/page/Client.vue'),
                //     meta: { title: '维护' }
                // },
                {
                    path: '/usermanage',
                    component: () => import('../components/page/UserManage.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/cloudfieldsurvey',
                    component: () => import('../components/page/CloudFieldSurvey.vue'),
                    meta: { title: '云现勘' }
                },
                {
                    path: '/clientmanagement',
                    component: () => import('../components/page/ClientManagement.vue'),
                    meta: { title: '委托人管理' }
                },
                {
                    path: '/casecheck',
                    component: () => import('../components/page/CaseCheck.vue'),
                    meta: { title: '查看案例详情' }
                },
                {
                    path: '/systeminterface',
                    component: () => import('../components/page/SystemInterface.vue'),
                    meta: { title: '其他系统入口' }
                },
                // {
                //     path: '/oprecord',
                //     component: () => import('../components/page/OpRecord.vue'),
                //     meta: { title: '操作记录' }
                // },
                // {
                //     path: '/icon',
                //     component: () => import('../components/page/Icon.vue'),
                //     meta: { title: '图标' }
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
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
            component: () => import(/* webpackChunkName: "login" */ '../components/page/NewLogin.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
