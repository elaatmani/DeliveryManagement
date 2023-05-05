// import {abilities} from "@/config/ability"

let initialState = {
    fetched: false,
    notifications: {
        "productStockAlert": [],
        "reportedSale": [],
        "reportedOrderAgente": [],
        "reportedOrderDelivery": []
    },
}

export default {
    name: 'notification',
    namespaced: true,

    state: initialState,

    getters: {
        notifications: (state) => state.notifications,
        fetched: (state) => state.fetched,
    },

    mutations: {
        SET_NOTIFICATIONS: (state, payload) => {
            state.notifications = payload
        },
        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
    },

    actions: {
        setNotifications: ({ commit }, payload) => {
            commit('SET_NOTIFICATIONS', payload)
        },
        setFetched: ({ commit }, payload) => {
            commit('SET_FETCHED', payload)
        },
    }
}