import { createStore } from 'vuex';

export default createStore({
  state: {
    isAdmin: false,
    isAdding: false,
    isLoading: false,
    isLogged: false,
    isFetching: false,
    userId: null,
    userName: '',
  },
  mutations: {
    SET_ADMIN_LOGIN(state, status) {
      state.isAdmin = status;
    },
    SET_USER_NAME(state, status) {
      state.isUserName = status;
    },
    SET_ADDING(state, status) {
      state.isAdding = status;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_LOGGED(state, status) {
      state.isLogged = status;
    },
    SET_FETCHING(state, status) {
      state.isFetching = status;
    },
    SET_USER_ID(state, status) {
      state.userId = status;
    },
  },
  actions: {},
  modules: {},
});
