<!--startShowing (),stopShowing ()の実行指示,変数cntは外部から取得-->
<template>
  <!--子のhtmlコンポーネントをnest-->
  <div id="time">{{time}}</div>
</template>
<script>
import mixin from '@/components/mixin.js'
import store from '../store'

export default {
  // cunsom要素をmixin
  mixins: [mixin],
  data: function () {
    return {
      PassSec: '',
      PassageID: '',
      time: '',
      sec: 30,
      num: 5
    }
  },

  methods: {
    showPassage: function showPassage () {
      var msg
      this.PassSec++
      //  msg = 29 - (Math.floor(PassSec/100)) + ":" +  ( '00' + (100 - PassSec%100)).slice( -2 );   // 表示文作成
      msg = (Math.floor(this.PassSec / 100)) + ':' + ('00' + (this.PassSec % 100)).slice(-2)
      this.time = msg
      this.endChk()
    },

    startShowing: function startShowing () {
      this.PassSec = 0
      this.PassageID = setInterval(this.showPassage, 10)
    },

    stopShowing: function stopShowing () {
      clearInterval(this.PassageID)
    },

    endChk: function endChk () {
      if ((this.PassSec / 100) >= this.sec || store.state.cnt === this.num) {
        this.endChkBase()
        //  ///////mixin///////////////////////////
        this.endChkCustom()
        //  ///////////////////////////////////////
      }
    },

    endChkBase: function endChkBase () {
      this.stopShowing()
      //  document.getElementById("time").innerHTML="0:00";
      document.getElementById('score').style.color = 'red'
      clearInterval(store.state.intervalID)
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
      this.startShowing()
    }
  }

}

</script>
<style scoped>
</style>
