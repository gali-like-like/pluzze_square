import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/game',
    children: [
      {
        path: 'game',
        name: 'Game',
        component: () => import('../views/game.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/about.vue'),
      },
      {
        path: 'view/score',
        name: 'ViewScore',
        component: () => import('../views/viewScore.vue'),
      }
    ],
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;