// import {abilities} from "@/config/ability"

let initialState = {
    fetched: false,
    sheets: []
}

export default {
    name: 'sheet',
    namespaced: true,

    state: initialState,

    getters: {
        fetched: (state) => state.fetched,
        sheets: (state) => state.sheets
    },

    mutations: {
        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
        SET_SHEETS: (state, payload) => {
            state.sheets = payload
        },
        ADD_SHEET: (state, payload ) => {
            state.sheets.push(payload)
        },
        DELETE_SHEET:(state , payload) => {
            state.sheets = state.sheets.filter((i) => i.id != payload)
        },
        UPDATE_SHEET:(state, payload) => {
            state.sheets = state.sheets.map((i)=> {
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
        setSheets: ({ commit }, payload) => {
            commit('SET_SHEETS', payload)
        },
        addSheet: ({ commit }, payload) => {
            commit('ADD_SHEET', payload)
        },
        update: ({ commit }, payload) => {
            commit('UPDATE_SHEET', payload)
        },
        delete: ({ commit }, payload) => {
            commit('DELETE_SHEET', payload)
        },
    }
}