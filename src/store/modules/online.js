// import {abilities} from "@/config/ability"

let initialState = {
    users: [],
    fetched: false,

}

export default {
    name: 'online',
    namespaced: true,

    state: initialState,

    getters: {

        fetched: (state) => state.fetched,
        users: (state) => state.users,
    },

    mutations: {
        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
        SET_USERS: (state, payload) => {
            state.users = payload
        },
    },

    actions: {
        setFetched: ({ commit }, payload) => {
            commit('SET_FETCHED', payload)
        },
        setUsers: ({ commit }, payload) => {
            commit('SET_USERS', payload)
        }
    }
}