const routes = [
  {
    name: 'landing',
    path: '/',
    component: () => import('/@/views/store/index.vue'),
    meta: {
      title: 'landing',
      keepAlive: true,
      transition: true,
    },
  },
];

export default routes;
