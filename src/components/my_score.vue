<!--startShowing (),stopShowing ()の実行指示,変数cntは外部から取得-->
<template>
   <div v-html="score" :class="classObjB"></div>
</template>
<script>

import store from '../store'

export default {
  data: function () {
    return {
      score: ''
    }
  },
  // watch用
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
div
{
position: fixed;bottom: 7%;right:10%; width:200px;height:70px;text-align: right;font-size: 25px;
}
</style>
