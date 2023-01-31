// import {abilities} from "@/config/ability"

let initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') == 'true' ? true : false,
    permissions: !localStorage.getItem('permissions') ? [] : JSON.parse(localStorage.getItem('permissions'))
}

export default {
    name: 'user',
    namespaced: true,

    state: initialState,

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