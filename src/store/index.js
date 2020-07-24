import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //  変数
  state: {
    cnt: 0,
    flg: false,
    endflg: false,
    okflg: true,
    intervalID: 0,
    answer: '',
    open: false
  },

  // getters:storeの複数stateを使って計算した結果を取得をするもの
  getters: {
    getsttflg: function (state) {
      return state.flg
    },
    getendflg: function (state) {
      return state.endflg
    },
    getcnt: function (state) {
      return state.cnt
    }
  },
  //  mutations:変数の値を変える関数。commitで実行
  mutations: {
    increment (state) {
      state.cnt++
    },
    decrement (state) {
      state.cnt--
    },
    sttflgon (state) {
      state.flg = true
    },
    endflgon (state) {
      state.endflg = true
    },
    okflgon (state) {
      state.okflg = true
    },
    ngflgon (state) {
      state.okflg = false
    },
    //  入力したい状態が元ファイルの関数の返り値なので第二引数利用
    setId (state, param) {
      state.intervalID = param
    },
    answerexist (state, param) {
      state.answer = param
    },
    aopen (state) {
      state.open = true
    },
    aclose (state) {
      state.open = false
    }
  },

  actions: {
  },
  modules: {}
})
