import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ?? '',
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
  },
  getters: {
   getToken(state) {
    return state.token
   },
   getIsAuthenticated(state) {
    return state.isAuthenticated
   }
  },
  mutations: {
    setToken(state, token) {
        state.token = token
    },
    setIsAuthenticated(state, status) {
        state.isAuthenticated = status
    }
  },
  actions: {
   login({commit}, object) {
    commit('setToken' , object.token);
    commit('setIsAuthenticated' , object.isAuthenticated);

    localStorage.setItem('token', object.token)
    localStorage.setItem('isAuthenticated', object.isAuthenticated)
   },
   logout({commit}) {
    commit('setToken' , '');
    commit('setIsAuthenticated' , false);

    localStorage.setItem('token', '')
    localStorage.setItem('isAuthenticated', false)
   },
   
  },
  modules: {},
});
