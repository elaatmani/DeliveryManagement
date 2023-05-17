// import {abilities} from "@/config/ability"

const check = localStorage.getItem('cities')

let initialState = {
    fetched: false,
    cities: !check ? [] : JSON.parse(check)
}

export default {
    name: 'city',
    namespaced: true,

    state: initialState,

    getters: {
        cities: (state) => state.cities,
        fetched: (state) => state.fetched,
    },

    mutations: {
        SET_CITIES: (state, payload) => {
            localStorage.setItem( 'cities', JSON.stringify(payload))
            state.cities = payload
        },

        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
    },

    actions: {
        setCities: ({ commit }, payload) => {
            commit('SET_CITIES', payload)
        },

        setFetched: ({ commit }, payload) => {
            commit('SET_FETCHED', payload)
        },
    }
}