import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: DashboardView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next) => {
  if(to.name != 'login' && !store.getters['User/getLoggedIn']) { next({name: 'login' });}
  else next()
})

export default router;
