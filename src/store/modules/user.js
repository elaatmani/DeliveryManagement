// import {abilities} from "@/config/ability"

let initialState = {
    roles: !localStorage.getItem('roles') ? [] : JSON.parse(localStorage.getItem('roles')),
    user: !localStorage.getItem('user') ? [] : JSON.parse(localStorage.getItem('user')),
    isLoggedIn: localStorage.getItem('isLoggedIn') == 'true' ? true : false,
    permissions: !localStorage.getItem('permissions') ? [] : JSON.parse(localStorage.getItem('permissions'))
}

export default {
    name: 'user',
    namespaced: true,

    state: initialState,

    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        permissions: (state) => state.permissions,
        user: (state) => state.user,
        roles: (state) => state.roles
    },

    mutations: {
        SET_IS_LOGGED_IN: (state, payload) => {
            localStorage.setItem('isLoggedIn', payload);
            state.isLoggedIn = payload
        },
        SET_USER: (state, payload) => {
            localStorage.setItem('user', JSON.stringify(payload));
            state.user = payload
        },
        SET_PERMISSIONS: (state, payload) => {
            localStorage.setItem('permissions', JSON.stringify(payload));
            state.permissions = payload
        },
        SET_ROLES: (state, payload) => {
            localStorage.setItem('roles', JSON.stringify(payload));
            state.roles = payload
        }
    },

    actions: {
        setUser: ({ commit }, payload) => {
            commit('SET_USER', payload)
        },
        setIsLoggedIn: ({ commit }, payload) => {
            commit('SET_IS_LOGGED_IN', payload)
        },
        setPermissions: ({ commit }, payload) => {
            commit('SET_PERMISSIONS', payload)
        },
        setRoles: ({ commit }, payload) => {
            commit('SET_ROLES', payload)
        },
        logout: ({commit}) => {
            commit('SET_USER', {})
            commit('SET_IS_LOGGED_IN', false)
            commit('SET_PERMISSIONS', [])
            commit('SET_ROLES', [])
        }
    }
}