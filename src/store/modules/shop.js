// import {abilities} from "@/config/ability"

let initialState = {
    shops: []
}

export default {
    name: 'shop',
    namespaced: true,

    state: initialState,

    getters: {
        shops: (state) => state.shops
    },

    mutations: {
        SET_SHOPS: (state, payload) => {
            state.shops = payload
        }
    },

    actions: {
        setShops: ({ commit }, payload) => {
            commit('SET_SHOPS', payload)
        },
    }
}