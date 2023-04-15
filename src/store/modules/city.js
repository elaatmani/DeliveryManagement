// import {abilities} from "@/config/ability"

const check = localStorage.getItem('cities')

let initialState = {
    cities: !check ? [] : JSON.parse(check),
}

export default {
    name: 'city',
    namespaced: true,

    state: initialState,

    getters: {
        cities: (state) => state.cities,
    },

    mutations: {
        SET_CITIES: (state, payload) => {
            localStorage.setItem( 'cities', JSON.stringify(payload))
            state.cities = payload
        },
    },

    actions: {
        setCities: ({ commit }, payload) => {
            commit('SET_CITIES', payload)
        },
    }
}