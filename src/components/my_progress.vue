<template>
  <progress max='100' v-bind:value='val'></progress>
</template>
<script>

import store from '../store'

export default {
  data: function () {
    return {
      val: 0
    }
  },

  methods: {
    updateProgress () {
      //  console.log(store.state.cnt)
      this.val++
      if (this.val === 100) { clearInterval(store.state.intervalID) }
    },
    setId () {
      store.commit('setId', setInterval(this.updateProgress, 300))
    }
  },
  computed: {
    getflg () {
      return store.getters.getflg
    }
  },

  watch: {
    getflg (num, old) {
      console.log('watch', num)
      this.val = 0
      //  300msおきにプログレスバー更新。30秒で100%。storeの値は参照だけでなくjsから直変更、代入もできるがcommit推奨
      this.setId()
      //  store.state.intervalID = setInterval(this.updateProgress, 300)
    }
  }
}

</script>
<style scoped>
progress {
  position: fixed;
  top: 13.2%;
  right: 4%;
  width: 100px;
  height: 40px;
  text-align: right;
}
</style>
