// import {abilities} from "@/config/ability"

let initialState = {
    products: [],
    fetched: false
}

export default {
    name: 'product',
    namespaced: true,

    state: initialState,

    getters: {
        products: (state) => state.products,
        fetched: (state) => state.fetched
    },

    mutations: {
        SET_PRODUCTS: (state, payload) => {
            state.products = payload
        },

        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
    },

    actions: {
        setProducts: ({ commit }, payload) => {
            commit('SET_PRODUCTS', payload)
        },

        setFetched: ({ commit }, payload) => {
            commit('SET_FETCHED', payload)
        },
    }
}