<!--問題表示、指令コメント表示、回答ボタン表示-->
<template>
  <div>
    <div class="qa_wrap">
      <div class="question">
        <img class="qa btnn" alt='' :src="require('../assets/btn.png')" :class="classObjC" @mousedown.prevent="click" @touchstart.prevent="click" :disabled="this.endflg" />
      </div>
    </div>
  </div>
</template>
<script>
// import store from '../store'
// vuexはthis.$store.stateを略して呼べるようにするため
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      btncnt: 0,
      score: 0,
      def: [],
      def_total: 0,
      defdef: 0,
      nowTime: [],
      interval_total: 0
    }
  },

  computed: {

    ...mapState(['sttflg', 'endflg', 'okflg', 'ngflg', 'answer', 'comment', 'question', 'question2', 'src', 'src2', 'bpm', 'duration', 'sttflg', 'cnt', 'bufferSource', 'ctx', 'bufdata']),
    ...mapGetters(['getsttflg', 'getendflg']),

    classObjC: function () {
      return {
        notpoint: this.endflg,
        redSudden: this.ngflg,
        greenSudden: this.okflg
      }
    }

  },

  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      //  31要素をshuffleしbuf0に代入
    },

    getendflg (num, old) {
      console.log('watch', num)
    }
  },

  methods: {
    // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'aopen', 'aclose', 'okflgon', 'okflgoff', 'ngflgon', 'ngflgoff', 'increment', 'decrement', 'commentchg', 'questionchg', 'question2chg', 'srcchg', 'src2chg', 'sttflgon', 'setcnt', 'setbuf', 'setctx', 'setdata']),

    click () {
      //  console.log(this.cnt)
      var comp = this.ctx
      var bufferSource = comp.createBufferSource()
      console.log(bufferSource)
      console.log(this.bufdata)
      bufferSource.buffer = this.bufdata
      bufferSource.connect(comp.destination)
      bufferSource.start(0)
      try { navigator.vibrate(5000) } catch (e) {}
      this.sttflgon()
      if (isNaN(this.bpm)) { alert('please enter bpm !!') }

      //  ボタンpushのたびにその時の時刻を配列に格納
      this.nowTime.push(new Date().getTime())
      if (this.btncnt > 0) {
        //  タップの間隔を配列に格納
        this.def.push(this.nowTime[this.btncnt] - this.nowTime[this.btncnt - 1])
      }

      if (this.btncnt < 2) {
        this.defdef = 0
      } else {
        this.defdef = Math.min(
          //  defdefは１つ前のdefとの差、それぞれの倍数の余りを比較し、最小値を採用。btncnt > 1からdefdef取れる
          Math.abs(this.def[this.btncnt - 1] - this.def[this.btncnt - 2]),
          Math.abs(this.def[this.btncnt - 1] % this.def[this.btncnt - 2]), Math.abs(this.def[this.btncnt - 2] % this.def[this.btncnt - 1])
        )
      }
      //  console.log(Math.abs(def[btncnt-2] - def[btncnt - 3]))
      //  console.log(Math.abs(def[btncnt-2] % def[btncnt - 3]))
      //  console.log(Math.abs(def[btncnt - 3] % def[btncnt-2]))

      if (this.btncnt > 1) {
        this.def_total = this.def_total + this.defdef
      }

      if (this.btncnt > 0) {
        this.interval_total = this.interval_total + Math.abs(this.def[this.btncnt - 1] - 60 / this.bpm * 1000)
        console.log(Math.abs(this.def[this.btncnt - 1] - 60 / this.bpm * 1000))
      }

      //  console.log(this.defdef)
      //  console.log(this.def_total)
      this.btncnt++
      console.log(this.def_total, this.interval_total, this.def_total / this.btncnt * 0.05, this.interval_total / this.btncnt * 0.01)

      this.setcnt(Math.floor(100 - this.def_total / this.btncnt * 0.05 - this.interval_total / this.btncnt * 0.05))
    }

  } //  methods
} //  export default

</script>
<style scoped>
img {
  width: 23%
}

.btnn {
  transition: filter .1s ease 0s;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.btnn:active {
  filter: brightness(1.5)
}

</style>
