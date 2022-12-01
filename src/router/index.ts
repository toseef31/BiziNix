import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import CompanyEdit from "../views/CompanyEdit.vue";
import HomePage from "../views/HomePage.vue";
import Contact from "../views/ContactPage.vue";
import ZalozenieZivnosti from "../views/ZalozenieZivnosti.vue";
import ZalozenieFirmy from "../views/ZalozenieFirmy.vue";
import Support from "../views/Support.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ActiveUser from "../views/ActiveUser.vue";
import ForgotPasswordSetNewPassword from "../views/ForgotPasswordSetNewPassword.vue";
import UserProfile from "../views/Profile.vue";
import CounselingCenterPageVue from "@/views/CounselingCenterPage.vue";
import store from "@/store";
import PostPageVue from "@/views/PostPage.vue";
import ThanksYouNewOrderVue from "@/views/ThanksYouNewOrder.vue";
import CompanyDetailsVue from "@/views/CompanyDetails.vue";
import VirtualHqPageVue from "@/views/VirtualHqPage.vue";
import OrderVirtualHqPageVue from "@/views/OrderVirtualHqPage.vue";
import HqAndMailPageVue from "@/views/HqAndMailPage.vue";
import ContactPageVue from "../views/ContactPage.vue";
import GdprPageVue from "@/views/GdprPage.vue";
import PricelistPageVue from "@/views/PricelistPage.vue";
import ObchodnePodmienkyPageVue from "@/views/ObchodnePodmienkyPage.vue";
import AboutUsPageVue from "@/views/AboutUsPage.vue";
import PostsPageVue from "@/views/PostsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: DefaultLayout,
      children: [
        { path: '/home', name: "Home", component: HomePage },
        { path: '/contact', name: "Contact", component: ContactPageVue },
        { path: '/gdpr', name: "Gdpr", component: GdprPageVue },
        { path: '/pricelist', name: "Pricelist", component: PricelistPageVue },
        { path: '/obchodne-podmienky', name: "Obchodne podmienky", component: ObchodnePodmienkyPageVue },
        { path: '/o-nas', name: "About us", component: AboutUsPageVue },
        { path: '/zalozenie-zivnosti', name: "ZalZivnosti", component: ZalozenieZivnosti },
        { path: '/zalozenie-firmy', name: "ZalFirmy", component: ZalozenieFirmy },
        { path: '/dakujeme-nova-objednavka/:orderId', name: "Thanks You New Order", component: ThanksYouNewOrderVue },
        { path: '/dakujeme-nova-objednavka/:orderId', name: "Thanks You New Order", component: ThanksYouNewOrderVue },
        { path: '/support', name: "Support", component: Support },
        { path: '/forgot-password', name: "Forgot Password", component: ForgotPassword },
        { path: '/password/find/:token', name: "Set new Password", component: ForgotPasswordSetNewPassword },
        { path: '/user/find/:token', name: "Set new Password", component: ForgotPasswordSetNewPassword },
        { path: '/user/activate/:token', name: "Active User", component: ActiveUser },
        { path: '/counseling-center', name: "Counseling center", component: CounselingCenterPageVue },
        { path: "/post/:id", name: "Post", component: PostPageVue },
        { path: '/user/profile', name: "User Profil", component: UserProfile, meta: { requiresAuth: true } },
        { path: '/dashboard', name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
        { path: '/edit-company', name: "Edit Company", component: CompanyEdit, meta: { requiresAuth: true } },
        { path: '/detail-spolocnosti/:id', name: "CompanyDetails", component: CompanyDetailsVue, meta: { requiresAuth: true } },
        { path: '/counseling-center', name: "Counseling center", component: CounselingCenterPageVue },
        { path: "/posts", name: "Posts", component: PostsPageVue },
        { path: "/post/:id", name: "Post", component: PostPageVue },
        { path: '/virtualne-sidlo', name: "Virtual hq", component: VirtualHqPageVue },
        { path: "/virtualne-sidlo/order", name: "Order vhq", component: OrderVirtualHqPageVue },
        { path: '/sidlo-a-posta', name: "Hq and mail", component: HqAndMailPageVue, meta: { requiresAuth: true } },
      ],
    },
    {
      path: "/auth",
      component: DefaultLayout,
      redirect: "/login",
      name: "Auth",
      meta: { isGuest: true },
      children: [
        { path: "/login", name: "Login", component: Login },
        { path: "/register", name: "Register", component: Register },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
