<!--score表示-->
<template>
  <span :class="classObjB">{{score}}</span>
</template>
<script>
import store from '../store'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      score: ''
    }
  },
  // watch用
  computed: {
    ...mapState(['sttflg', 'endflg', 'okflg', 'ngflg', 'cnt', 'btncnt', 'bpm', 'sec']),
    ...mapGetters(['getendflg']),

    getcnt () {
      return store.getters.getcnt
    },

    classObjB: function () {
      return {
        notlook: !this.sttflg,
        textgreen: this.okflg,
        textred: this.ngflg
      }
    }
  },

  methods: {
    // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['setcnt'])
  },

  watch: {
    getcnt (num, old) {
      console.log('watch', num)
      if (this.cnt < 0) {
        this.score = 0 + '点'
      } else {
        this.score = this.cnt + '点'
      }
    },
    getendflg (num, old) {
      console.log('watch', num)
      console.log(this.btncnt, parseInt(this.bpm), this.sec)
      this.setcnt(this.cnt - Math.abs((this.btncnt - parseInt(this.bpm) * this.sec / 60) * 10))
      if (this.cnt < 0) {
        this.score = 0 + '点'
      } else {
        this.score = this.cnt + '点'
      }
    }
  }

}

</script>
<style scoped>
span {
  font-size: 25px;
  z-index: 1001;
  pointer-events: none
}

</style>
