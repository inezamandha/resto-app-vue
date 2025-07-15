import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MenuPage from '../components/MenuPage.vue';
import BookingPage from '../components/BookingForm.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/menu', component: MenuPage },
  { path: '/booking', component: BookingPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
