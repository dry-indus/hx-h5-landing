import { createApp } from 'vue';
import App from './App.vue';
import { nutUiComponents } from './plugins/nutUI';
import { i18n } from '/@/i18n';
import router from '/@/router';
import store from '/@/store';
import './assets/font/iconfont.css';
import './assets/telegram/iconfont.css';
import './assets/app.css';
import './styles/index.scss';
import '@nutui/nutui/dist/style.css';
import 'animate.css/animate.min.css';
import { Request } from '/@/utils/request';
import VueAxios from 'vue-axios';
import VueTouch from 'vue-touch';

const app = createApp(App);
app.use(VueTouch, { name: 'v-touch' });
VueTouch.config.swipe = {
  threshold: 50, //设置左右滑动的距离
};

// 路由
app.use(router);

// 国际化
app.use(i18n);

// 状态管理
app.use(store);

// nutUi按需加载
nutUiComponents.forEach((item) => {
  app.use(item);
});
app.use(VueAxios, Request.init());
app.mount('#app');
