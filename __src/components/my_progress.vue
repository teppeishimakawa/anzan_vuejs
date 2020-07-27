<template>
  <progress max='100' v-bind:value='val'></progress>
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
    ...mapState(['intervalID'])
  },

  methods: {
    ...mapMutations(['setId']),

    updateProgress () {
      //  console.log(store.state.cnt)
      this.val++
      if (this.val === 100) { clearInterval(this.intervalID) }
    }
  },
  //  sttflg:onで変数intervalIDにsetInterval(this.updateProgress, 300)を代入
  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      this.val = 0
      //  300msおきにプログレスバー更新。30秒で100%。storeの値は参照だけでなくjsから直変更、代入もできるがcommit推奨
      //  store.commit('setId', setInterval(this.updateProgress, 300))
      this.setId(setInterval(this.updateProgress, 300))
      //  store.state.intervalID = setInterval(this.updateProgress, 300)
    }
  }
}

</script>
<style scoped>
progress {
  position: fixed;
  top: 3%;
  right: 4%;
  width: 100px;
  height: 40px;
  text-align: right;
}
</style>
