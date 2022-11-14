const routes = [
  {
    path: '/',
    redirect: '/landing',
    component: () => import('/@/layout/basic/index.vue'),
    children: [
      {
        path: 'merchant/home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: 'tabbar.home',
          keepAlive: true,
        },
      },
      {
        name: 'cart',
        path: 'merchant/cart',
        component: () => import('/@/views/home/cart/index.vue'),
        meta: {
          title: 'tabbar.cart',
          keepAlive: true,
          transition: true,
        },
      },
      {
        path: 'merchant/tab2',
        component: () => import('/@/views/tab2/index.vue'),
        meta: {
          title: 'tabbar.tab2',
          keepAlive: true,
        },
      },
      {
        path: 'merchant/me',
        component: () => import('/@/views/me/index.vue'),
        meta: {
          title: 'tabbar.me',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/merchant/login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
      transition: true,
    },
  },
  {
    name: 'register',
    path: '/merchant/register',
    component: () => import('/@/views/register/index.vue'),
    meta: {
      title: 'tabbar.register',
      keepAlive: true,
      transition: true,
    },
  },
  {
    name: 'edit',
    path: '/merchant/edit',
    component: () => import('/@/views/home/edit/index.vue'),
    meta: {
      title: 'tabbar.edit',
      keepAlive: true,
      transition: true,
    },
  },
  {
    name: 'batchAdd',
    path: '/merchant/batchAdd',
    component: () => import('/@/views/home/batchAdd/index.vue'),
    meta: {
      title: 'tabbar.batchAdd',
      keepAlive: true,
      transition: true,
    },
  },
  {
    name: 'landing',
    path: '/landing',
    component: () => import('/@/views/store/index.vue'),
    meta: {
      title: 'tabbar.batchAdd',
      keepAlive: true,
      transition: true,
    },
  },
  {
    name: 'choice',
    path: '/choice',
    component: () => import('/@/views/store/list.vue'),
    meta: {
      title: 'tabbar.batchAdd',
      keepAlive: true,
      transition: true,
    },
  },
];

export default routes;
