// import {abilities} from "@/config/ability"

let initialState = {
    orders: [],
}

export default {
    name: 'order',
    namespaced: true,

    state: initialState,

    getters: {
        orders: (state) => state.orders,
    },

    mutations: {
        SET_ORDERS: (state, payload) => {
            state.orders = payload
        },
        UPDATE_CONFIRMATION: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.confirmation = payload.confirmation
                        console.log('order updated');
                    }
                    return item
                }
            )
        
        },
        UPDATE_CONFIRMATION_WITH_NOTE: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.confirmation = payload.confirmation
                        item.note = payload.note        
                        console.log('order updated');
                    }
                    return item
                }
            )
        
        },
        UPDATE_UPSELL: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.upsell = payload.upsell
                        console.log('sale updated');
                    }
                    return item
                }
            )
        },
        UPDATE_AFFECTATION: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.affectation = payload.affectation
                        console.log('sale updated');
                    }
                    return item
                }
            )
        },
        UPDATE_NOTE: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.note = payload.note
                        console.log('sale updated');
                    }
                    return item
                }
            )
        },
    },

    actions: {
        setOrders: ({ commit }, payload) => {
            commit('SET_ORDERS', payload)
        },
        updateConfirmation: ({ commit }, payload) => {
            commit('UPDATE_CONFIRMATION', payload)
        },
        updateConfirmationWithNote: ({ commit }, payload) => {
            commit('UPDATE_CONFIRMATION_WITH_NOTE', payload)
        },
        updateUpsell: ({ commit }, payload) => {
            commit('UPDATE_UPSELL', payload)
        },
        updateAffectation: ({ commit }, payload) => {
            commit('UPDATE_AFFECTATION', payload)
        },
        updateNote: ({ commit }, payload) => {
            commit('UPDATE_NOTE', payload)
        },
    }
}