import { createStore } from "vuex";
import axiosClient from "@/axios";

export const store = createStore({
    state: {
        user: {
            data: {
                name: '',
                email: '',
                imageUrl:
                  '',
            },
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {},
    actions: {
        registerUser({ commit }, user) { // registerUser is dispatch must be same name is defined in Register component or view user second argument for registartion
            return axiosClient.post("/users/register", user)
            .then(({data}) => {
                commit('setUser', data) // setuser here us muttation for store
                return data;
            })
        },
        loginUser({ commit }, user) { // loginUser is dispatch from Login view or component user second argument for login
            return axiosClient.post("/users/login", user)
                .then(({data}) => {
                    commit('setUser', data) // setuser here us muttation for store
                    return data;
                })
        },
    },
    mutations:{
        logout: (state) => {
            state.user.data.name = "",
            state.user.data.email = "",
            state.user.data.imageUrl = "",
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => { // userData from res from action
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
        }
    },
    modules: {},
})

export default store;