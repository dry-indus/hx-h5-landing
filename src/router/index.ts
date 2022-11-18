import { createRouter, Router, createWebHistory } from 'vue-router';
import routes from './routes';
import { useTransitionStore } from '/@/store/modules/transition';
// import { getCookie } from '/@/utils/jsCookie';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach(async (to, from) => {
  useTransitionStore().handleRouteChange({ to, from });
});

export default router;
