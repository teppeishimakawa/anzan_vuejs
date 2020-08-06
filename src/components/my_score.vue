<!--score表示-->
<template>
   <div :class="classObjB">{{score}}</div>
</template>
<script>

import store from '../store'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      score: ''
    }
  },
  // watch用
  computed: {
    ...mapState(['sttflg', 'endflg', 'okflg', 'ngflg', 'cnt']),

    getcnt () {
      return store.getters.getcnt
    },

    classObjB: function () {
      return {
        notlook: !this.sttflg || this.endflg,
        textgreen: this.okflg,
        textred: this.ngflg
      }
    }
  },

  watch: {
    getcnt (num, old) {
      console.log('watch', num)
      this.score = this.cnt
    }
  }
}

</script>
<style scoped>
div
{
position: fixed;bottom: 4%;right:10%; width:200px;height:70px;text-align: right;font-size: 25px;
}
</style>
