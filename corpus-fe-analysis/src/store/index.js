import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    speakers: [],
  },
  actions: {
    setSpeakers(context, payload) {
      context.commit('setSpeakers', payload);
    },
  },
  mutations: {
    setSpeakers(state, payload) {
      state.speakers = payload;
    },
  },
  getters: {},
});
