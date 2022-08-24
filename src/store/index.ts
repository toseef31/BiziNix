import { createStore } from "vuex";
import axiosClient from "@/axios";

export const store = createStore({
    state: {
        user: {
            data: {},
            userId: sessionStorage.getItem("USER_ID"),
            firstName: sessionStorage.getItem("FIRST_NAME"),
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {
        getUser: (state)  => {
            return state.user.data;
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
        }
    },
    mutations:{
        logoutUser: (state) => {
            state.user.token = null
            state.user.userId = null
            state.user.data = {},
            sessionStorage.removeItem("USER_ID");
            sessionStorage.removeItem("FIRST_NAME");
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
            sessionStorage.setItem("FIRST_NAME", userData.user.first_name)
        }
    },
    modules: {},
})

export default store;