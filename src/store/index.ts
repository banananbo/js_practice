import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

interface State {
  test: string
}

export default new Vuex.Store({
  state: {
    test: "Test Vuex"
  } as State,
  modules:{
  },
  mutations:{
  },
  getters:{
  },
  actions:{
  }
})
