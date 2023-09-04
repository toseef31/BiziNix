import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Backoffice/Dashboard.vue";
import Login from "../views/User/Login.vue";
import Register from "../views/User/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import MojDefaultLayout from "../components/MojDefaultLayout.vue";
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
import Payment from "@/views/Common/Payment.vue";
import CompanyDetailsVue from "@/views/Backoffice/CompanyDetails.vue";
import VirtualHqPageVue from "@/views/VirtualHQ/VirtualHqPage.vue";
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
import OrderDocumentsPageVue from "@/views/Documents/OrderDocumentsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: DefaultLayout,
      meta: { isGuest: true },
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
        { path: '/payment/:orderId/:paymentMethod', name: "Payment", component: Payment },
        { path: '/forgot-password', name: "Forgot Password", component: ForgotPassword },
        { path: '/password/find/:token', name: "Set new Password", component: ForgotPasswordSetNewPassword },
        { path: '/user/find/:token', name: "Set new Password", component: ForgotPasswordSetNewPassword },
        { path: '/user/activate/:token', name: "Active User", component: ActiveUser },
        { path: '/counseling-center', name: "Counseling center", component: CounselingCenterPageVue },        
        { path: "/posts", name: "Posts", component: PostsPageVue },
        { path: "/post/:id", name: "Post", component: PostPageVue },
        { path: '/virtualne-sidlo', name: "Virtual hq", component: VirtualHqPageVue },
        { path: '/documents', name: "Documents", component: DocumentsPageVue },
        { path: "/documents/order", name: "Order documents", component: OrderDocumentsPageVue },
      ],
    },
    {
      path: "/moj",
      component: MojDefaultLayout,
      redirect: "/moj/dashboard",
      name: "Moj",
      meta: { isGuest: false },
      children: [
        { path: '/moj/user/profile', name: "User Profil", component: UserProfile, meta: { requiresAuth: true } },
        { path: '/moj/user/fakturacne', name: "Fakturačné profily", component: UserProfile, meta: { requiresAuth: true } },
        { path: '/moj/dashboard', name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
        { path: '/moj/edit-company', name: "Edit Company", component: CompanyEdit, meta: { requiresAuth: true } },
        { path: '/moj/detail-spolocnosti/:id', name: "CompanyDetails", component: CompanyDetailsVue, meta: { requiresAuth: true } },
        { path: '/moj/add-document/:subtype', name: "Add document", component: AddDocumentPageVue, meta: { requiresAuth: true }, props: true },
        { path: '/moj/documents-design', name: "Document designs", component: DocumentsDesignPageVue, meta: { requiresAuth: true } },
        { path: '/moj/my-documents', name: "Doklady", component: DocumentsListPageVue, meta: { requiresAuth: true } },
        { path: '/moj/doklad', name: "Doklad", component: DocumentDetailsVue, meta: { requiresAuth: true } },
        { path: '/moj/sidlo-a-posta', name: "Sídlo a pošta", component: HqAndMailPageVue, meta: { requiresAuth: true } },
      ]
    },
    {
      path: "/auth",
      component: DefaultLayout,
      redirect: "/login",
      name: "Auth",
      meta: { isGuest: true },
      children: [
        { path: "/login", name: "Login", component: Login, meta: { isLoginPage: true } },
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

  const previousRoute = from.fullPath;
  
  if (to.meta.requiresAuth && !store.state.user.token && to.path != '/login') {
    sessionStorage.setItem('redirectPath', to.path)
    next({ name: 'Login' });
  } else if(to.path === '/login' && !from.meta.isLoginPage){
    // If the user arrives on the login page from a public page, store the previous public page's path in sessionStorage
    sessionStorage.setItem('publicPagePath', from.path)
    next() // Continue navigation to the login page
  }
  else {
    next();
  }

});

export default router;
