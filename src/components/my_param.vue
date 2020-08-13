<!--問題表示、指令コメント表示、回答ボタン表示-->
<template>
  <div>
    <div class="qa_wrap">
      <div class="question">
        <label>bpm:</label>
        <input type="text" v-model="bpm">
      </div>
    </div>
  </div>
</template>
<script>
// import store from '../store'
// vuexはthis.$store.stateを略して呼べるようにするため
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      cnt: 0,
      score: 0,
      def: [],
      def_total: 0,
      defdef: 0,
      nowTime: [],

      ctx: '',
      xml: '',
      data: ''
    }
  },

  computed: {

    ...mapState(['sttflg', 'endflg', 'okflg', 'ngflg', 'answer', 'comment', 'question', 'question2', 'src', 'src2', 'bpm']),
    ...mapGetters(['getsttflg', 'getendflg', 'getbpm']),

    classObjC: function () {
      return {
        notlook: !this.sttflg || this.endflg,
        redSudden: this.ngflg,
        greenSudden: this.okflg
      }
    },
    bpm: {
      get () {
        return this.$store.state.bpm
      },
      set (value) {
        this.setbpm(value)
      }
    }
  },

  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      //  31要素をshuffleしbuf0に代入
    },

    getendflg (num, old) {
      console.log('watch', num)
    }
  },

  methods: {
    // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'aopen', 'aclose', 'okflgon', 'okflgoff', 'ngflgon', 'ngflgoff', 'increment', 'decrement', 'commentchg', 'questionchg', 'question2chg', 'srcchg', 'src2chg', 'setbpm'])

  } //  methods
} //  export default

</script>
<style scoped>
</style>
