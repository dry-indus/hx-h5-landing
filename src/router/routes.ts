const routes = [
  {
    name: 'landing',
    path: '/landing',
    component: () => import('/@/views/store/index.vue'),
    meta: {
      title: 'landing',
      keepAlive: true,
      transition: true,
    },
  },
  {
    name: 'choice',
    path: '/choice',
    component: () => import('/@/views/store/list.vue'),
    meta: {
      title: 'choice',
      keepAlive: true,
      transition: true,
    },
  },
];

export default routes;
