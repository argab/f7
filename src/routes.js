import HomePage from './pages/home.vue';
import FormPage from './pages/form.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
