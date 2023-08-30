// import {abilities} from "@/config/ability"

import Agent from "@/api/Agent"

let initialState = {
    fetched: false,
    totalAvailable: 0,
    totalConfirmed: 0,
    totalNotConfirmed: 0,
}

export default {
    name: 'agent',
    namespaced: true,

    state: initialState,

    getters: {
        fetched: (state) => state.fetched,
        state: (state) => state,
    },

    mutations: {
        SET_FETCHED: (state, payload) => {
            state.fetched = payload
        },
        SET_TOTAL_CONFIRMED: (state, payload) => {
            state.totalConfirmed = payload
        },
        SET_TOTAL_NOT_CONFIRMED: (state, payload ) => {
            state.totalNotConfirmed = (payload)
        },
        SET_TOTAL_AVAILABLE:(state , payload) => {
            state.totalAvailable = payload
        },
    },

    actions: {
        setFetched: ({ commit }, payload) => {
            commit('SET_FETCHED', payload)
        },
        setTotalConfirmed: ({ commit }, payload) => {
            commit('SET_TOTAL_CONFIRMED', payload)
        },
        setTotalNotConfirmed: ({ commit }, payload) => {
            commit('SET_TOTAL_NOT_CONFIRMED', payload)
        },
        setTotalAvailable: ({ commit }, payload) => {
            commit('SET_TOTAL_AVAILABLE', payload)
        },

        refreshCounts: (context) => {
            context.commit('SET_FETCHED', false)
            console.log(context);
            Agent.counts()
                .then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                    const data = res.data.data
                    context.commit('SET_TOTAL_CONFIRMED', data.confirmed)
                    context.commit('SET_TOTAL_NOT_CONFIRMED', data.not_confirmed)
                    context.commit('SET_TOTAL_AVAILABLE', data.available)
                    context.commit('SET_FETCHED', true)
                    }
                }
                )
        }
    }
}