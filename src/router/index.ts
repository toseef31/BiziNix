import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import CompanyEdit from "../views/CompanyEdit.vue"
import HomePage from "../views/HomePage.vue"
import Contact from "../views/Contact.vue"
import Support from "../views/Support.vue"
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: DefaultLayout,
      children: [
        { path: '/home', name: "Home", component: HomePage },
        { path: '/contact', name: "Contact", component: Contact },
        { path: '/support', name: "Support", component: Support },
        { path: '/dashboard', name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
        { path: '/edit-company', name: "Úprava firmy", component: CompanyEdit, meta: { requiresAuth: true } }
      ],
    },
    {
      path: '/auth',
      component: DefaultLayout,
      redirect: "/login",
      name: "Auth",
      meta: { isGuest: true },
      children: [
        { path: '/login', name: "Login", component: Login },
        { path: "/register", name: "Register", component: Register }
      ]
    },
  ],
});

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth && !store.state.user.token ) {
    next({ name: 'Login' })
  } else if(store.state.user.token && (to.meta.isGuest)){
    next({name: "Dashboard"})
  }
   else {
    next();
  }
  
})

export default router;
