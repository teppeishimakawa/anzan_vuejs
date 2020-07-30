<!--count start/stop,time更新-->
<template>
  <div></div>
</template>
<script>

import store from '../store'
import { mapState, mapMutations } from 'vuex'

export default {

  data: function () {
    return {
      PassageID: '',
      PassSec: 0,
      sec: 30,
      num: 5
    }
  },

  computed: {
    getsttflg () {
      return store.getters.getsttflg
    },
    ...mapState(['cnt', 'intervalID', 'time', 'starttime'])
  },
  //  sttflg:on検知でthis.startShowing()開始
  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      this.startShowing()
    }
  },

  methods: {
    ...mapMutations(['endflgon', 'gettime', 'setstarttime']),

    showPassage () {
      var nowTime = new Date().getTime()
      var diff = new Date(nowTime - this.starttime)
      var millisec = diff.getMilliseconds()
      var sec100 = Math.floor(millisec / 10)
      this.PassSec = diff.getSeconds()

      console.log(this.PassSec)
      //  msg = 29 - (Math.floor(PassSec/100)) + ":" +  ( '00' + (100 - PassSec%100)).slice( -2 );   // 表示文作成
      this.gettime(('00' + String(this.PassSec)).slice(-2) + ':' + ('00' + String(sec100)).slice(-2))
      this.endChk()
    },

    startShowing () {
      this.setstarttime(new Date().getTime())
      this.PassageID = setInterval(this.showPassage, 10)
    },

    stopShowing () {
      clearInterval(this.PassageID)
    },

    endChk () {
      if ((this.PassSec) >= this.sec || this.cnt === this.num) {
        //  store.commit('endflgon')
        this.endflgon()
        this.endChkBase()
        //  ///////mixin///////////////////////////
        //  this.endChkCustom()
        //  ///////////////////////////////////////
      }
    },

    endChkBase () {
      this.stopShowing()
      //  document.getElementById("time").innerHTML="0:00";
      //  document.getElementById('score').style.color = 'red'
      clearInterval(this.intervalID)
    }
  }

}

</script>
<style scoped>
/*
div
{
position: fixed;
top: 4.5%;
right:5%;
width:200px;
text-align:right;
font-size: 15px;
}
*/
</style>
