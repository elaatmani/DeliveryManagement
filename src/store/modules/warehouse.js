// import {abilities} from "@/config/ability"

let initialState = {
    warehouses: []
}

export default {
    name: 'warehouse',
    namespaced: true,

    state: initialState,

    getters: {
        warehouses: (state) => state.warehouses
    },

    mutations: {
        SET_WAREHOUSES: (state, payload) => {
            state.warehouses = payload
        }
    },

    actions: {
        setWarehouses: ({ commit }, payload) => {
            commit('SET_WAREHOUSES', payload)
        },
    }
}