<!--startShowing (),stopShowing ()の実行指示,変数cntは外部から取得-->
<template>
   <div id="score" v-html="score" :class="classObjB"></div>
</template>
<script>

import store from '../store'

export default {
  data: function () {
    return {
      score: ''
    }
  },

  computed: {
    getcnt () {
      return store.getters.getcnt
    },

    classObjB: function () {
      return {
        //  canlook: this.$store.state.flg && !this.$store.state.endflg,
        notlook: !this.$store.state.flg || this.$store.state.endflg,
        textblack: this.$store.state.okflg,
        textred: !this.$store.state.okflg
      }
    }
  },

  watch: {
    getcnt (num, old) {
      console.log('watch', num)
      this.score = store.state.cnt
    }
  }
}

</script>
<style scoped>
</style>
