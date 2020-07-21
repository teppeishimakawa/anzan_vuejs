import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //  変数
  state: { count: 0 },
  //  変数を変える関数。commitで実行
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {},
  modules: {}
})
