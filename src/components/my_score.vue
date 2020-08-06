<!--score表示-->
<template>
   <span :class="classObjB">{{score}}</span>
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
span
{
font-size: 25px;
z-index: 1001;
pointer-events: none
}
</style>
