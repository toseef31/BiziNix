import { createStore } from "vuex";
import axiosClient from "@/axios";

export const store = createStore({
  state: {
    user: {
      data: {},
      address: {},
      userId: sessionStorage.getItem("USER_ID"),
      token: sessionStorage.getItem("TOKEN"),
    },
    reviews: [],
    posts: [],
    faqs: [],
  },
  getters: {
    getUser: (state) => {
      return state.user;
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
    userAddress({ commit, dispatch }, userAddress) {
      let response;
      if (this.state.user.userId) {
        response = axiosClient
          .get(`/address/${this.state.user.userId}/get`)
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
  },
  mutations: {
    logoutUser: (state) => {
      state.user.token = null;
      state.user.userId = null;
      (state.user.data = {}), sessionStorage.removeItem("USER_ID");
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
      state.user.data = userData.user;
    },
    setCurrentUserProfile: (state, userProfile) => {
      // console.log("Mutations: " + JSON.stringify(userProfile))
      state.user.data = userProfile.user;
    },
    setUserAddress: (state, userAddress) => {
      state.user.address = userAddress.data;
    },
    setUserAddressAfterUpdate: (state, userAddress) => {
      state.user.address = userAddress.address;
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
  },
  modules: {},
});

export default store;
