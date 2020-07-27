<!--startShowing (),stopShowing ()の実行指示,変数cntは外部から取得-->
<template>
  <!--子のhtmlコンポーネントをnest-->
  <div>{{time}}</div>
</template>
<script>
//  import mixin from '@/components/mixin.js'
import store from '../store'
import { mapState, mapMutations } from 'vuex'

export default {
  // cunsom要素をmixin
  //  mixins: [mixin],
  data: function () {
    return {
      PassSec: '',
      PassageID: '',
      time: '',
      sec: 30,
      num: 10
    }
  },

  computed: {
    getsttflg () {
      return store.getters.getsttflg
    },
    ...mapState(['cnt', 'intervalID'])
  },
  //  sttflg:on検知でthis.startShowing()開始
  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      this.startShowing()
    }
  },

  methods: {
    ...mapMutations(['endflgon']),

    showPassage () {
      var msg
      this.PassSec++
      //  msg = 29 - (Math.floor(PassSec/100)) + ":" +  ( '00' + (100 - PassSec%100)).slice( -2 );   // 表示文作成
      msg = (Math.floor(this.PassSec / 100)) + ':' + ('00' + (this.PassSec % 100)).slice(-2)
      this.time = msg
      this.endChk()
    },

    startShowing () {
      this.PassSec = 0
      this.PassageID = setInterval(this.showPassage, 10)
    },

    stopShowing () {
      clearInterval(this.PassageID)
    },

    endChk () {
      if ((this.PassSec / 100) >= this.sec || this.cnt === this.num) {
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

div
{
position: fixed;top: 4.5%; right:5%;  width:200px;height:70px;text-align:right;font-size: 15px;
}
</style>
