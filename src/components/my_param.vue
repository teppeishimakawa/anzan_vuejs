<!--bpm設定、コメント表示-->
<template>
  <div>
        <label>bpm:</label>
        <input type="text" v-model="bpm">
        <br>
        <span :class="classObjE">{{this.comment}}</span>
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
      nowTime: []
    }
  },

  computed: {

    ...mapState(['sttflg', 'endflg', 'comment', 'bpm', 'comment', 'goodflg', 'superflg']),
    ...mapGetters(['getsttflg', 'getendflg', 'getbpm']),

    classObjE: function () {
      return {
        notlook: !this.sttflg || this.endflg,
        redSudden: !this.goodflg,
        greenSudden: this.goodflg,
        blueSudden: this.superflg
      }
    },
    //  入力値をvuexに反映させるための対処
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
      //  console.log('watch', num)
    },

    getendflg (num, old) {
      //  console.log('watch', num)
    }
  },

  methods: {
    // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['commentchg', 'setbpm'])

  } //  methods
} //  export default

</script>
<style scoped>

span{
font-size: 25px;
font-weight: bold;
}
</style>
