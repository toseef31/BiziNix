import { createStore } from "vuex";
import axiosClient from "@/axios";
import type Mail from "@/types/Mail";
import type Company from "@/types/Company";

export const store = createStore({
  state: {
    user: {
      data: {},
      address: {},
      userId: sessionStorage.getItem("USER_ID"),
      addressId: null,
      token: sessionStorage.getItem("TOKEN"),
    },
    reviews: [],
    posts: [],
    faqs: [],
    company: {},
    myCompanies: [],
    headquarter: {},
    order: [{}],
    vhqs: [],
    selectedCompany: {} as Company,
    mails: [] as Mail[],
    hq: {},
    hqAddress: {},
    selectedCompanyMails: [],
    selectedCompanyAddress: {},
    document: {}
  },
  getters: {
    getDocument: (state) => {
      return state.document;
    },
    getReviews: (state) => {
      return state.reviews;
    },
    getPosts: (state) => {
      return state.posts;
    },
    getFaqs: (state) => {
      return state.faqs;
    },
    getOrder: (state) => (id: any) => {
      return state.order.find((order: any) => order.id === id);
    },
    getHeadquartersById: (state) => (id: any) => {
      return state.hq;
    },
    getHqAddress: (state) => (id: any) => {
      return state.hqAddress;
    },
    getMails: (state) => (id: any) => {
      return state.mails;
    },
    getSelectedCompany: (state) => {
      return state.selectedCompany;
    },
    getSelectedCompanyMails: (state) => {
      return state.selectedCompanyMails;
    },
    getSelectedCompanyAddress: (state) => {
      return state.selectedCompanyAddress;
    },
  },
  actions: {
    registerUser({ commit }, user) {
      // registerUser is dispatch must be same name is defined in Register component or view user second argument for registartion
      return axiosClient.post("/users/register", user).then(({ data }) => {
        commit("setUser", data); // setuser is defined as muttation below
        return data;
      });
    },
    registerAddress({ commit }, userAddress) {
      return axiosClient.post("/address/add", userAddress).then(({ data }) => {
        return data;
      });
    },
    loginUser({ commit }, user) {
      // loginUser is dispatch from Login view or component user second argument for login
      return axiosClient.post("/users/login", user).then(({ data }) => {
        commit("setUser", data); // setuser is defined as muttation below
        return data;
      });
    },
    setUserDataAfterLogin({ commit }, userData) {
      return axiosClient.get("/users/profile", userData).then(({ data }) => {
        commit("setUserData", data);
        return data;
      });
    },
    logoutUser({ commit }) {
      return axiosClient.get("/users/logout").then((response) => {
        commit("logoutUser");
        return response;
      });
    },
    forgotPasswordSendEmmail({ commit }, user) {
      return axiosClient.post("/password/create", user).then((response) => {
        return response;
      });
    },
    forgotPasswordSetNewPassword({ commit }, newPassword) {
      return axiosClient
        .post("/password/reset", newPassword)
        .then((response) => {
          return response;
        });
    },
    updateUser({ commit, dispatch }, userProfile) {
      if (userProfile.id) {
        return axiosClient
          .put(`/users/${userProfile.id}/update`, userProfile)
          .then((res) => {
            // console.log("Res from userProfile: " + JSON.stringify(res))
            commit("setCurrentUserProfile", res.data);
            return res;
          });
      }
    },
    userAddress({ commit, dispatch }) {
      if (this.state.user.userId) {
        axiosClient
          .get(`/address/${this.state.user.addressId}/get`)
          .then((res) => {
            commit("setUserAddress", res.data);
            return res;
          });
      }
    },
    updateUserAddress({ commit, dispatch }, userAddress) {
      if (userAddress.id) {
        return axiosClient
          .put(`/address/${userAddress.id}/update`, userAddress)
          .then((res) => {
            commit("setUserAddressAfterUpdate", res.data);
            return res;
          });
      }
    },
    //#region Company actions
    async getAllSubjectOfBusiness() {
      const response = await axiosClient.get(
        "/subjectOfBusiness/getAllSubjectsOfBusiness"
      );
      return response;
    },
    async getHeadquartersTypes() {
      const response = await axiosClient.get(
        "/headquarters/getHeadquartersTypes"
      );
      return response;
    },
    async getDocumentSnCounters() {
      const response = await axiosClient.get(
        "/companies/getDocumentSnCounters"
      );
      return response;
    },
    async getHeadquartersById({ commit }, hqId) {
      const { data } = await axiosClient.get(`/headquarters/${hqId}/get`);
      return data;
    },
    addCompany({ commit }, company) {
      return axiosClient.post("/companies/add", company).then(({ data }) => {
        commit("setCompany", data); // setCompany is defined as muttation below
        return data;
      });
    },
    addHeadquarter({ commit }, headquarter) {
      return axiosClient
        .post("/headquarters/add", headquarter)
        .then(({ data }) => {
          commit("setHeadquarter", data); // setHeadquarter is defined as muttation below
          return data;
        });
    },
    async getAllCompaniesByUserId({ commit }, userId) {
      const { data } = await axiosClient.get(`/companies/${userId}/getAll`);
      commit("setMyCompanies", data);
      return data;
    },
    async getCompanyById({ commit }, companyId) {
      const { data } = await axiosClient.get(`/companies/${companyId}/get`);
      commit("setCompany", data);
      return data;
    },
    async getSelectedCompany({ commit }, companyId) {
      const { data } = await axiosClient.get(`/companies/${companyId}/get`);
      return data;
    },
    async getCompanyBankDetails({ commit }, companyId) {
      const { data } = await axiosClient.get(
        `/companies/${companyId}/getBankDetails`
      );
      return data;
    },
    async getDocumentSnForCompany({ commit }, companyId) {
      const { data } = await axiosClient.get(
        `/companies/${companyId}/getDocumentSnForCompany`
      );
      return data;
    },
    async isEmailAlreadyRegistered({ commit }, email: string) {
      const { data } = await axiosClient.get(`/users/${email}/check`);
      return data;
    },
    async addMultipleCompanyMembers({ commit }, members) {
      const { data } = await axiosClient.post(
        "/companyMembers/addMultiple",
        members
      );
      return data;
    },
    async updateCompany({ commit, dispatch }, company) {
      if (company.id) {
        return axiosClient
          .put(`/companies/${company.id}/update`, company)
          .then((res) => {
            commit("setCompany", res.data);
            return res;
          });
      }
    },
    async uploadCompanyLogo({ commit, dispatch }, data) {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      return axiosClient
        .post(
          `/companies/${data.companyId}/uploadCompanyLogo`,
          data.body,
          config
        )
        .then((res) => {
          commit("setCompany", res.data);
          return res;
        });
    },
    //#endregion
    //#region documents
    async getAllDocumentsForCompany({ commit }, companyId) {
      const { data } = await axiosClient.get(`/documents/${companyId}/getAll`);
      return data;
    },
    async getDocumentSubtypes() {
      const { data } = await axiosClient.get(`/documents/getDocumentSubTypes`);
      return data;
    },
    async getDocumentTemplates() {
      const { data } = await axiosClient.get(`/documents/getDocumentTemplates`);
      return data;
    },
    async getDocumentById({ commit }, id) {
      const { data } = await axiosClient.get(`/documents/${id}/get`);
      return data;
    },
    async downloadDocument({ commit }, id) {
      const { data } = await axiosClient.get(`/documents/${id}/download`);
      return data;
    },
    sendReminder({ commit, dispatch }, data) {
      if (data.id) {
        return axiosClient
          .post(`/documents/${data.id}/sendReminder`, data)
          .then((res) => {
            return res;
          });
      }
    },
    addDocument({ commit }, document) {
      return axiosClient.post("/documents/add", document).then(({ data }) => {
        return data;
      });
    },
    updateDocument({ commit, dispatch }, document) {
      if (document.id) {
        return axiosClient
          .put(`/documents/${document.id}/update`, document)
          .then((res) => {
            return res;
          });
      }
    },
    deleteDocument({ commit }, id) {
      return axiosClient.delete(`/documents/${id}/delete`);
    },
    //#endregion
    //#region orders
    addOrder({ commit }, order) {
      return axiosClient.post("/orders/add", order).then(({ data }) => {
        commit("setOrder", data); // setOrder is defined as muttation below
        return data;
      });
    },
    //#endregion
    //#region payments
    async pay({ commit }, amount) {
      return axiosClient.post("/payments/pay", amount).then(({ data }) => {
        return data;
      });
    },
    //#endregion
    async reviews({ commit }) {
      await axiosClient.get("/reviews/getAllReviews").then(({ data }) => {
        commit("setReviews", data);
      });
    },
    async posts({ commit }) {
      await axiosClient.get("/posts/getAllPosts").then(({ data }) => {
        commit("setPosts", data);
      });
    },
    async faqs({ commit }) {
      await axiosClient.get("/faqs/getAllFaqs").then(({ data }) => {
        commit("setFaqs", data);
      });
    },
    async vhqs({ commit }) {
      await axiosClient
        .get("/headquarters/getAllVirtualHeadquarters")
        .then(({ data }) => {
          commit("setVhqs", data);
        });
    },
    async getAddressById({ commit }, address_id) {
      const { data } = await axiosClient.get(`/address/${address_id}/get`);
      return data;
    },
    async getAllMailsForCompany({ commit }, companyId) {
      const { data } = await axiosClient.get(`/mails/${companyId}/getAll`);
      commit("setMails", data);
      return data;
    },
    updateMail({ commit, dispatch }, mail) {
      if (mail.id) {
        return axiosClient.put(`/mails/${mail.id}/update`, mail).then((res) => {
          commit("setMailsAfterUpdate", res.data);
          return res;
        });
      }
    },
    updateMultipleMails({ commit, dispatch }, mails) {
      console.log(mails);
      return axiosClient
        .put(`/mails/updateMultiple`, { mails: mails })
        .then((res) => {
          commit("setMailsAfterUpdate", res.data);
          return res;
        });
    },
    setDocument({ commit }, data) {
      commit("setDocument", data);
    },
  },
  mutations: {
    logoutUser: (state) => {
      state.user.token = null;
      state.user.userId = null;
      state.user.addressId = null;
      (state.user.data = {}),
        (state.user.address = {}),
        sessionStorage.removeItem("USER_ID");
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      // userData from res from action
      // console.log("User Data from Login: " + userData);
      state.user.token = userData.token;
      state.user.userId = userData.id;
      sessionStorage.setItem("USER_ID", userData.id);
      sessionStorage.setItem("TOKEN", userData.token);
    },
    setUserData: (state, userData) => {
      state.user.addressId = userData.user.address_id;
      state.user.data = userData.user;
    },
    setCurrentUserProfile: (state, userProfile) => {
      state.user.data = userProfile.user;
    },
    setUserAddress: (state, userAddress) => {
      state.user.address = userAddress.data;
    },
    setUserAddressAfterUpdate: (state, userAddress) => {
      state.user.address = userAddress.address;
    },
    setMailsAfterUpdate: (state, mails) => {
      state.mails = mails;
    },
    setDocument: (state, data) => {
      state.document = data;
    },
    setReviews: (state, data) => {
      state.reviews = data.data;
    },
    setPosts: (state, data) => {
      state.posts = data.data;
    },
    setFaqs: (state, data) => {
      state.faqs = data.data;
    },
    setCompany: (state, data) => {
      state.company = data.data;
    },
    setHeadquarter: (state, data) => {
      state.headquarter = data.data;
    },
    setOrder: (state, data) => {
      state.order.push(data.order);
    },
    setMyCompanies: (state, data) => {
      state.myCompanies = data.data;
    },
    setVhqs: (state, data) => {
      state.vhqs = data.data;
    },
    setMails: (state, data) => {
      state.mails = data.data;
    },
    setSelectedCompany: (state, data) => {
      state.selectedCompany = data.data;
    },
    setSelectedCompanyMails: (state, data) => {
      state.selectedCompanyMails = data.data;
    },
    setSelectedCompanyAddress: (state, data) => {
      state.selectedCompanyAddress = data.data;
    },
  },
  modules: {},
});

export default store;
