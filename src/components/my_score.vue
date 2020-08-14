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
    ...mapState(['sttflg', 'endflg', 'cnt', 'btncnt', 'bpm', 'sec', 'goodflg', 'superflg']),
    ...mapGetters(['getendflg']),

    getcnt () {
      return store.getters.getcnt
    },

    classObjB: function () {
      return {
        notlook: !this.sttflg,
        textgreen: this.goodflg,
        textred: !this.goodflg,
        textblue: this.superflg
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
      //  btncntは0から開始なので1引く
      console.log(this.btncnt - 1, parseInt(this.bpm), this.sec)
      //  最後に、規定カウントよりタップ多くても少なくても減点。以下ならcalcTapは10回タップ想定
      var calcTap = parseInt(this.bpm) * this.sec / 60
      this.setcnt(this.cnt - Math.abs((this.btncnt - 1 - calcTap) * 100 / calcTap))
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
