import { createRouter, Router, createWebHistory } from 'vue-router';
import routes from './routes';
import { useTransitionStore } from '/@/store/modules/transition';
import { getCookie } from '/@/utils/jsCookie';

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: routes,
});
const whiteList = ['/merchant/login', '/merchant/register', '/', '/choice', '/landing'];

router.beforeEach(async (to, from, next) => {
  useTransitionStore().handleRouteChange({ to, from });
  if (getCookie('hoken')) {
    if (to.path === '/merchant/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/merchant/login?redirect=${to.fullPath}`);
    }
  }
  // next();
});

export default router;
