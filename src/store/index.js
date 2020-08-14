import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //  変数
  state: {
    cnt: 0,
    sttflg: false,
    endflg: false,
    time: '',
    starttime: '',
    bpm: 20,
    ctx: '',
    bufdata: '',
    btncnt: 0,
    sec: 30,
    goodflg: true,
    superflg: false,
    comment: ''
  },

  // getters:storeの複数stateを使って計算した結果を取得をするもの
  getters: {
    getsttflg: function (state) {
      return state.sttflg
    },
    getendflg: function (state) {
      return state.endflg
    },
    //  得点
    getcnt: function (state) {
      return state.cnt
    },
    getbpm: function (state) {
      return state.bpm
    }
  },
  //  mutations:変数の値を変える関数。commitで実行
  mutations: {
    sttflgon (state) {
      state.sttflg = true
    },
    endflgon (state) {
      state.endflg = true
    },
    //  入力したい状態が元ファイルの関数の返り値なので第二引数利用
    //  timer ID
    setId (state, param) {
      state.intervalID = param
    },
    gettime (state, param) {
      state.time = param
    },
    setstarttime (state, param) {
      state.starttime = param
    },
    setcnt (state, param) {
      state.cnt = param
    },
    setbpm (state, param) {
      state.bpm = param
    },
    setctx (state, param) {
      state.ctx = param
    },
    setdata (state, param) {
      state.bufdata = param
    },
    setbuf (state, param) {
      state.bufferSource = param
    },
    incrementbtncnt (state) {
      state.btncnt++
    },
    goodflgon (state) {
      state.goodflg = true
    },
    goodflgoff (state) {
      state.goodflg = false
    },
    superflgon (state) {
      state.superflg = true
    },
    superflgoff (state) {
      state.superflg = false
    },
    commentchg (state, param) {
      state.comment = param
    }
  },

  actions: {
  },
  modules: {}
})
