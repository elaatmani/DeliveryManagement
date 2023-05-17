// import {abilities} from "@/config/ability"

let initialState = {
    fetched: false,
    warehouses: []
}

export default {
    name: 'warehouse',
    namespaced: true,

    state: initialState,

    getters: {
        fetched: (state) => state.fetched,
        warehouses: (state) => state.warehouses
    },

    mutations: {
        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
        SET_WAREHOUSES: (state, payload) => {
            state.warehouses = payload
        },
        ADD_WAREHOUSE: (state, payload ) => {
            state.warehouses.push(payload)
        },
        DELETE_WAREHOUSE:(state , payload) => {
            state.warehouses = state.warehouses.filter((i) => i.id != payload)
        },
        UPDATE_WAREHOUSE:(state, payload) => {
            state.warehouses = state.warehouses.map((i)=> {
                if (i.id == payload.id){
                    return {...payload}
                }
                return i
            })
        }
    },

    actions: {
        setFetched: ({ commit }, payload) => {
            commit('SET_FETCHED', payload)
        },
        setWarehouses: ({ commit }, payload) => {
            commit('SET_WAREHOUSES', payload)
        },
        addWarehouse: ({ commit }, payload) => {
            commit('ADD_WAREHOUSE', payload)
        },
        update: ({ commit }, payload) => {
            commit('UPDATE_WAREHOUSE', payload)
        },
        delete: ({ commit }, payload) => {
            commit('DELETE_WAREHOUSE', payload)
        },
    }
}