import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import CompanyEdit from "../views/CompanyEdit.vue"
import HomePage from "../views/HomePage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: DefaultLayout,
      children: [
        { path: '/home', name: "Home", component: HomePage },
        { path: '/dashboard', name: "Dashboard", component: Dashboard },
        { path: '/company-edit', name: "CompanyEdit", component: CompanyEdit }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    }
  ],
});

export default router;
