import { defineStore } from 'pinia';
import CircularJSON from 'circular-json';

interface TransitionInfo {
  directionName: string;
  routeStack: Array<any>;
}
export const useTransitionStore = defineStore({
  id: 'transition',
  state: (): TransitionInfo => ({
    directionName: '',
    routeStack: [],
  }),
  actions: {
    PUSH_ROUTE_STACK(route) {
      if (route) {
        this.routeStack.push(CircularJSON.parse(CircularJSON.stringify(route)));
      }
    },
    POP_ROUTE_STACK() {
      this.routeStack.pop();
    },
    SET_DIRECRTION_NAME(direction) {
      this.directionName = direction;
    },
    // 记录页面前进/后退
    handleRouteChange(payload) {
      const { to } = payload;
      const len = this.routeStack.length;
      if (len === 0) {
        const homePath = '/'; //首页路由
        if (to.path === homePath) {
          // 直接打开首页
          this.PUSH_ROUTE_STACK(to);
        } else {
          // 直接打开非首页
          this.PUSH_ROUTE_STACK(to);
          this.PUSH_ROUTE_STACK({ path: homePath });
        }
      } else if (len === 1) {
        // 先打开首页，再打开其他路由
        // this.SET_DIRECRTION_NAME('slide-left');
        this.PUSH_ROUTE_STACK(to);
      } else {
        const lastBeforeRoute = this.routeStack[len - 2];
        if (lastBeforeRoute.path === to.path) {
          // 打开上一页路由，后退
          this.POP_ROUTE_STACK();
          this.SET_DIRECRTION_NAME('slide-right');
        } else {
          // 前进
          this.PUSH_ROUTE_STACK(to);
          this.SET_DIRECRTION_NAME('slide-left');
        }
      }
    },
  },
});
