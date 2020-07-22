import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //  変数
  state: {
    cnt: 0,
    flg: 0,
    endflg: 0,
    intervalID: 0
  },
  // getters:storeの複数stateを使って計算した結果を取得をするもの
  getters: {
    getflg: function (state) {
      return state.flg
    }
  },
  //  変数の値を変える関数。commitで実行
  mutations: {
    increment (state) {
      state.cnt++
    },
    decrement (state) {
      state.cnt--
    },
    flgon (state) {
      state.flg = 1
    },
    setId (state, param) {
      state.intervalID = param
    }
  },

  actions: {
  },
  modules: {}
})
