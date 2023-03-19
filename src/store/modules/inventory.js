// import {abilities} from "@/config/ability"

let initialState = {
    inventoryList: [],
    inventoryState: [],
    inventoryMovements: [],
}

export default {
    name: 'inventory',
    namespaced: true,

    state: initialState,

    getters: {
        inventoryList: (state) => state.inventoryList,
        inventoryState: (state) => state.inventoryState,
        inventoryMovements: (state) => state.inventoryMovements,
    },

    mutations: {
        SET_INVENTORY_LIST: (state, payload) => {
            state.inventoryList = payload
        },
        SET_INVENTORY_STATE: (state, payload) => {
            state.inventoryState = payload
        },
        SET_INVENTORY_MOVEMENTS: (state, payload) => {
            state.inventoryMovements = payload
        },
    },

    actions: {
        setInventoryList: ({ commit }, payload) => {
            commit('SET_INVENTORY_LIST', payload)
        },
        setInventoryState: ({ commit }, payload) => {
            commit('SET_INVENTORY_STATE', payload)
        },
        setInventoryMovements: ({ commit }, payload) => {
            commit('SET_INVENTORY_MOVEMENTS', payload)
        },
    }
}