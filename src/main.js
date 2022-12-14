//          /\    \                  /\    \                  /\    \                  /\    \         
//         /::\____\                /::\    \                /::\____\                /::\    \        
//        /:::/    /                \:::\    \              /::::|   |               /::::\    \       
//       /:::/    /                  \:::\    \            /:::::|   |              /::::::\    \      
//      /:::/    /                    \:::\    \          /::::::|   |             /:::/\:::\    \     
//     /:::/____/                      \:::\    \        /:::/|::|   |            /:::/__\:::\    \    
//    /::::\    \                       \:::\    \      /:::/ |::|   |            \:::\   \:::\    \   
//   /::::::\    \   _____               \:::\    \    /:::/  |::|___|______    ___\:::\   \:::\    \  
//  /:::/\:::\    \ /\    \               \:::\    \  /:::/   |::::::::\    \  /\   \:::\   \:::\    \ 
// /:::/  \:::\    /::\____\_______________\:::\____\/:::/    |:::::::::\____\/::\   \:::\   \:::\____\
// \::/    \:::\  /:::/    /\::::::::::::::::::/    /\::/    / ~~~~~/:::/    /\:::\   \:::\   \::/    /
//  \/____/ \:::\/:::/    /  \::::::::::::::::/____/  \/____/      /:::/    /  \:::\   \:::\   \/____/ 
//           \::::::/    /    \:::\~~~~\~~~~~~                    /:::/    /    \:::\   \:::\    \     
//            \::::/    /      \:::\    \                        /:::/    /      \:::\   \:::\____\    
//            /:::/    /        \:::\    \                      /:::/    /        \:::\  /:::/    /    
//           /:::/    /          \:::\    \                    /:::/    /          \:::\/:::/    /     
//          /:::/    /            \:::\    \                  /:::/    /            \::::::/    /      
//         /:::/    /              \:::\____\                /:::/    /              \::::/    /       
//         \::/    /                \::/    /                \::/    /                \::/    /        
//          \/____/                  \/____/                  \/____/                  \/____/         
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // ????????????
// import './assets/css/theme-green/index.css'; // ???????????????
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import { isAuthenticated } from '@/api/index';
import { formatDate } from './utils/comment';
import moment from 'moment';
import less from 'less'
import VueClipboard from 'vue-clipboard2'

import globalVariable from './utils/globalvariable'
Vue.prototype.global = globalVariable;

import '@/utils/dialogdrag.js' //???????????????,????????????,??????

Vue.prototype.$formatDate = formatDate;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
window.router = router;
Vue.use(VueI18n);
Vue.use(less);
Vue.use(VueClipboard)

Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

//?????????????????????????????????????????????
router.beforeEach((to, from, next) => {
  document.title = `??????????????????`;
  const role = localStorage.getItem('role');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // ???????????????????????????????????????????????????????????????????????????????????????
    role < 3 ? next() : next('/403');
  } else {
    // ???????????????IE10?????????????????????????????????????????????????????????
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert(
        'vue-quill-editor???????????????IE10????????????????????????????????????????????????????????????',
        '????????????????????????',
        {
          confirmButtonText: '??????'
        }
      );
    } else {
      next();
    }
  }
});

//?????????????????????????????? this.$moment('date').format('YYYY-MM-DD') ??????
Vue.filter('weekformat', function(dataStr, pattern = 'W') {
  return moment(dataStr).format(pattern);
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');

