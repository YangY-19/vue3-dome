import Vuex from 'vuex';

export default Vuex.createStore({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info
    }
  }, 
  actions: {
  },
});
