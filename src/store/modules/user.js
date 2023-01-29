import {abilities} from "@/config/ability"

export default {
    name: 'user',
    namespaced: true,

    state: {
        isLoggedIn: true,
        permissions: abilities,
        user: {}
    },

    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        permissions: (state) => state.permissions
    },

    mutations: {
        SET_IS_LOGGED_IN: (state, payload) => {
            state.isLoggedIn = payload
        },
        SET_PERMISSIONS: (state, payload) => {
            state.permissions = payload
        },
    },

    actions: {
        setIsLoggedIn: ({ commit }, payload) => {
            commit('SET_IS_LOGGED_IN', payload)
        },
        setPermissions: ({ commit }, payload) => {
            commit('SET_PERMISSIONS', payload)
        }
    }
}