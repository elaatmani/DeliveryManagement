export default {
  name: "app",
  namespaced: true,

  state: {
    notifications: {
      fetched: false,
      all: [],
      data: [],
      count: 0,
      highlighted: null,
    },
  },

  getters: {
    notifications: (state) => state.notifications,
  },

  mutations: {
    SET_DATA: (state, payload) => {
      state.notifications.data = payload;
    },
    SET_ALL_NOTIFICATIONS: (state, payload) => {
      state.notifications.all = payload;
    },
    SET_COUNT:(state, payload) => {
        state.notifications.count = payload
    },
    SET_HIGHLIGHTED: (state, payload) => {
      state.notifications.highlighted = payload;
    },
    CHANGE_STATUS:(state) => {
      state.notifications.data = state.notifications.data.map(
        item => {
          item.status = "read"
            return item
        },
        state.notifications.count =  0
    )
    }
  },

  actions: {
    setData({ commit }, payload) {
      commit("SET_DATA", payload);
    },
    setAllNotifications({ commit }, payload) {
      commit("SET_ALL_NOTIFICATIONS", payload);
    },
    sethighlighted({ commit }, payload) {
      commit("SET_HIGHLIGHTED", payload);
    },
    setCount({ commit }, payload){
        commit("SET_COUNT", payload);

    },
    updatestatus({ commit},payload) {
      commit("CHANGE_STATUS", payload);
    }
  },
};
