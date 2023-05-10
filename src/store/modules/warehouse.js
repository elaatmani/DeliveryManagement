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
                    return payload
                }
                return i
            })
        }
    },

    actions: {
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