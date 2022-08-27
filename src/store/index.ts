import { createStore } from "vuex";
import axiosClient from "@/axios";

export const store = createStore({
    state: {
        user: {
            data: {},
            userId: sessionStorage.getItem("USER_ID"),
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {
        getUser: (state)  => {
            return state.user;
        }
    },
    actions: {
        registerUser({ commit }, user) { // registerUser is dispatch must be same name is defined in Register component or view user second argument for registartion
            return axiosClient.post("/users/register", user)
            .then(({data}) => {
                commit('setUser', data) // setuser is defined as muttation below
                return data;
            })
        },
        loginUser({ commit }, user) { // loginUser is dispatch from Login view or component user second argument for login
            return axiosClient.post("/users/login", user)
                .then(({data}) => {
                    commit('setUser', data) // setuser is defined as muttation below
                    return data;
                })
        },
        setUserDataAfterLogin({commit}, userData) {
            return axiosClient.get("/users/profile", userData)
                .then(({data}) => {
                    commit('setUserData', data)
                    return data;
                })
        },
        logoutUser({commit}){
            return axiosClient.get("/users/logout")
                .then(response => {
                    commit('logoutUser');
                    return response;
                })
        },
        forgotPasswordSendEmmail({commit}, user){
            return axiosClient.post("/password/create", user)
            .then(response => {
                return response;
            })
        },
        forgotPasswordSetNewPassword({commit}, newPassword){
            return axiosClient.post("/password/reset", newPassword)
            .then(response => {
                return response;
            })
        },
        updateUser({commit, dispatch}, userProfile){
            let response;
            if(userProfile.id){
                response = axiosClient
                .put(`/users/${userProfile.id}/update`, userProfile)
                .then((res) => {
                    console.log("Res from userProfile: " + JSON.stringify(res.data.user))
                    commit('setCurrentUserProfile', res.data)
                    return res;
                })
            }
        }
    },
    mutations:{
        logoutUser: (state) => {
            state.user.token = null
            state.user.userId = null
            state.user.data = {},
            sessionStorage.removeItem("USER_ID");
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => { // userData from res from action
            //console.log("User Data from Login: " + userData);
            state.user.token = userData.token;
            state.user.userId = userData.id;
            sessionStorage.setItem("USER_ID", userData.id);
            sessionStorage.setItem("TOKEN", userData.token);
        },
        setUserData: (state, userData) => {
            state.user.data = userData.user
        },
        setCurrentUserProfile: (state, userProfile) => {
            console.log("Mutations: " + JSON.stringify(userProfile))
            state.user.data = userProfile.user
        }
    },
    modules: {},
})

export default store;