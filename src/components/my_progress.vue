<!--プログレスバー生成コンポーネント -->
<template>
  <div>
   <v-progress-linear color="info" absolute rounded height='20' style=" top: 0%;left:calc(80% - 40px) ; width: 80px;" :value='val'>
    <strong>{{this.time}}</strong>
   </v-progress-linear>
 </div>
</template>

<script>

import store from '../store'
import { mapState, mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      val: 0
    }
  },

  computed: {
    getsttflg () {
      return store.getters.getsttflg
    },
    ...mapState(['intervalID', 'time'])
  },

  methods: {
    ...mapMutations(['setId']),

    updateProgress () {
      this.val++
      if (this.val === 100) { clearInterval(this.intervalID) }
    }
  },
  //  sttflg検知
  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      this.val = 0
      //  300msでval:1増加。storeの値は参照だけでなくjsから直setもできるがcommit推奨
      //  store.commit('setId', setInterval(this.updateProgress, 300))
      this.setId(setInterval(this.updateProgress, 300))
      //  store.state.intervalID = setInterval(this.updateProgress, 300)
    }
  }
}

</script>
<style scoped>
div{
position: relative;
height:20px;
}

/*
progress {
  position: fixed;
  top: 3%;
  right: 4%;
  width: 100px;
  height: 40px;
  text-align: right;
}
*/
</style>
