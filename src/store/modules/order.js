// import {abilities} from "@/config/ability"

let initialState = {
    orders: [],
    order: null,
    all_orders: [],
    fetched: false,
}

export default {
    name: 'order',
    namespaced: true,

    state: initialState,

    getters: {
        fetched: (state) => state.fetched,
        orders: (state) => state.orders,
        order: (state) => state.order,
        allOrders: (state) => state.all_orders,
    },

    mutations: {
        SET_ORDERS: (state, payload) => {
            state.orders = payload;
        },

        ADD_ORDER: (state, payload) => {
            state.orders.unshift(payload);
            state.all_orders.unshift(payload);
        },

        SET_FETCHED: (state, payload) => {
            state.fetched = payload;
        },

        SET_ALL_ORDERS: (state, payload) => {
            state.all_orders = payload
        },

        SET_ORDER: (state, payload) => {
            state.order = payload
        },
        UPDATE_ORDER: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id === payload.id) {
                        return payload.order
                    }
                    return item
                }
            )
            state.all_orders = state.all_orders.map(
                item => {
                    if(item.id === payload.id) {
                        return payload.order
                    }
                    return item
                }
            )
        },
        UPDATE_CONFIRMATION: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.confirmation = payload.confirmation
                        if(payload.confirmation == 'confirmer') {
                            item.delivery = 'dispatch'
                        }
                        console.log('order updated');
                    }
                    return item
                }
            )
            state.all_orders = state.all_orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.confirmation = payload.confirmation
                        if(payload.confirmation == 'confirmer') {
                            item.delivery = 'dispatch'
                        }
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
                        if(payload.confirmation == 'confirmer') {
                            item.delivery = 'dispatch'
                        }
                        console.log('order updated');
                    }
                    return item
                }
            )
            state.all_orders = state.all_orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.confirmation = payload.confirmation
                        item.note = payload.note        
                        if(payload.confirmation == 'confirmer') {
                            item.delivery = 'dispatch'
                        }
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
            state.all_orders = state.all_orders.map(
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
            state.all_orders = state.all_orders.map(
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
            state.all_orders = state.all_orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.note = payload.note
                        console.log('sale updated');
                    }
                    return item
                }
            )
        },
        UPDATE_DELIVERY: (state, payload) => {
            state.orders = state.orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.delivery = payload.delivery
                        console.log('sale updated');
                    }
                    return item
                }
            )
            state.all_orders = state.all_orders.map(
                item => {
                    if(item.id == payload.id) {
                        item.delivery = payload.delivery
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

        addOrder: ({ commit }, payload) => {
            commit('ADD_ORDER', payload)
        },

        setFetched: ({commit}, payload) => {
            commit('SET_FETCHED', payload)
        },

        setAllOrders: ({commit}, payload) => {
            commit('SET_ALL_ORDERS', payload);
        },
        setOrder: ({ commit }, payload) => {
            commit('SET_ORDER', payload)
        },
        update: ({ commit }, payload) => {
            commit('UPDATE_ORDER', payload)
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
        updateDelivery: ({ commit }, payload) => {
            commit('UPDATE_DELIVERY', payload)
        },
    }
}