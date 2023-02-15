import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Backoffice/Dashboard.vue";
import Login from "../views/User/Login.vue";
import Register from "../views/User/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import CompanyEdit from "../views/Company/CompanyEdit.vue";
import HomePage from "../views/Common/HomePage.vue";
import ZalozenieZivnosti from "../views/Company/ZalozenieZivnosti.vue";
import ZalozenieFirmy from "../views/Company/ZalozenieFirmy.vue";
import ForgotPassword from "../views/User/ForgotPassword.vue";
import ActiveUser from "../views/User/ActiveUser.vue";
import ForgotPasswordSetNewPassword from "../views/User/ForgotPasswordSetNewPassword.vue";
import UserProfile from "../views/User/Profile.vue";
import CounselingCenterPageVue from "@/views/Common/CounselingCenterPage.vue";
import store from "@/store";
import PostPageVue from "@/views/Info/PostPage.vue";
import ThanksYouNewOrderVue from "@/views/Common/ThanksYouNewOrder.vue";
import CompanyDetailsVue from "@/views/Backoffice/CompanyDetails.vue";
import VirtualHqPageVue from "@/views/VirtualHQ/VirtualHqPage.vue";
import OrderVirtualHqPageVue from "@/views/VirtualHQ/OrderVirtualHqPage.vue";
import HqAndMailPageVue from "@/views/Backoffice/HqAndMailPage.vue";
import ContactPageVue from "../views/Info/ContactPage.vue";
import GdprPageVue from "@/views/Info/GdprPage.vue";
import PricelistPageVue from "@/views/Info/PricelistPage.vue";
import ObchodnePodmienkyPageVue from "@/views/Info/ObchodnePodmienkyPage.vue";
import AboutUsPageVue from "@/views/Info/AboutUsPage.vue";
import PostsPageVue from "@/views/Info/PostsPage.vue";
import DocumentsPageVue from "@/views/Documents/DocumentsPage.vue";
import AddDocumentPageVue from "@/views/Backoffice/AddDocumentPage.vue";
import DocumentDetailsVue from "@/views/Backoffice/DocumentDetails.vue";
import DocumentsDesignPageVue from "@/views/Backoffice/DocumentsDesignPage.vue";
import DocumentsListPageVue from "@/views/Backoffice/DocumentsListPage.vue";

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
        { path: "/posts", name: "Posts", component: PostsPageVue },
        { path: "/post/:id", name: "Post", component: PostPageVue },
        { path: '/virtualne-sidlo', name: "Virtual hq", component: VirtualHqPageVue },
        { path: "/virtualne-sidlo/order", name: "Order vhq", component: OrderVirtualHqPageVue },
        { path: '/sidlo-a-posta', name: "Hq and mail", component: HqAndMailPageVue, meta: { requiresAuth: true } },
        { path: '/documents', name: "Documents", component: DocumentsPageVue },
        { path: '/add-document', name: "Add document", component: AddDocumentPageVue, meta: { requiresAuth: true } },
        { path: '/documents-design', name: "Document designs", component: DocumentsDesignPageVue, meta: { requiresAuth: true } },
        { path: '/my-documents', name: "My documents", component: DocumentsListPageVue, meta: { requiresAuth: true } },
        { path: '/my-documents/:id', name: "My document", component: DocumentDetailsVue, meta: { requiresAuth: true } },
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
