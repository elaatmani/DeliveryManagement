// import {abilities} from "@/config/ability"

let initialState = {
    fetched: false,
    factorisations: []
}

export default {
    name: 'factorisation',
    namespaced: true,

    state: initialState,

    getters: {
        fetched: (state) => state.fetched,
        factorisations: (state) => state.factorisations
    },

    mutations: {
        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
        SET_FACTORISATIONS: (state, payload) => {
            state.factorisations = payload
        },
        ADD_FACTORISATION: (state, payload ) => {
            state.factorisations.push(payload)
        },
        DELETE_FACTORISATION:(state , payload) => {
            state.factorisations = state.factorisations.filter((i) => i.id != payload)
        },
        UPDATE_FACTORISATION:(state, payload) => {
            state.factorisations = state.factorisations.map((i)=> {
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
        setFactorisations: ({ commit }, payload) => {
            commit('SET_FACTORISATIONS', payload)
        },
        addFactorisation: ({ commit }, payload) => {
            commit('ADD_FACTORISATION', payload)
        },
        update: ({ commit }, payload) => {
            commit('UPDATE_FACTORISATION', payload)
        },
        delete: ({ commit }, payload) => {
            commit('DELETE_FACTORISATION', payload)
        },
    }
}