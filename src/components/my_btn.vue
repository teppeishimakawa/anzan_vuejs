<!--ボタンタップ、スコア判定、音声再生-->
<template>
  <div>
        <img class="btnn" alt='' :src="require('../assets/btn.png')" :class="classObjC" @mousedown.prevent="click" @touchstart.prevent="click" :disabled="this.endflg" />
  </div>
</template>
<script>
// import store from '../store'
// vuexはthis.$store.stateを略して呼べるようにするため
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      score: 0,
      def: [],
      def_total: 0,
      defdef: 0,
      nowTime: [],
      interval_total: 0
    }
  },

  computed: {

    ...mapState(['sttflg', 'endflg', 'bpm', 'duration', 'cnt', 'bufferSource', 'ctx', 'bufdata', 'btncnt', 'goodflg']),
    ...mapGetters(['getsttflg', 'getendflg']),

    classObjC: function () {
      return {
        notpoint: this.endflg
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
    ...mapMutations(['commentchg', 'sttflgon', 'setcnt', 'setbuf', 'setctx', 'setdata', 'incrementbtncnt', 'goodflgon', 'goodflgoff', 'superflgon', 'superflgoff']),

    click () {
      //  そのままthisを利用するとNGだったので以下代入対処
      var comp = this.ctx
      var bufferSource = comp.createBufferSource()

      bufferSource.buffer = this.bufdata
      bufferSource.connect(comp.destination)
      bufferSource.start(0)

      try {
        //  iosでは動かず
        window.navigator.vibrate(200)
        window.navigator.webkitVibrate(200)
        window.navigator.mozVibrate(200)
      } catch (e) {}

      this.sttflgon()
      if (isNaN(this.bpm)) { alert('please enter bpm !!') }

      //  ボタンpushのたびにその時の時刻を配列に格納
      this.nowTime.push(new Date().getTime())

      if (this.btncnt > 0) {
        //  2回目以降、タップの間隔を配列に格納
        this.def.push(this.nowTime[this.btncnt] - this.nowTime[this.btncnt - 1])
      }
      //  tap間隔の差分
      if (this.btncnt < 2) {
        this.defdef = 0
      } else {
        this.defdef = Math.min(
          //  defdefは１つ前のdefとの差、それぞれの倍数の余りを比較し、最小値を採用。btncnt > 1からdefdef取得可能。defは間隔なのでbtncntよりも一つ少ない
          Math.abs(this.def[this.btncnt - 1] - this.def[this.btncnt - 2]),
          Math.abs(this.def[this.btncnt - 1] % this.def[this.btncnt - 2]), Math.abs(this.def[this.btncnt - 2] % this.def[this.btncnt - 1])
        )
      }
      //  console.log(Math.abs(def[btncnt-2] - def[btncnt - 3]))
      //  console.log(Math.abs(def[btncnt-2] % def[btncnt - 3]))
      //  console.log(Math.abs(def[btncnt - 3] % def[btncnt-2]))

      //  interval同士が均一になっているか判定
      if (this.btncnt > 1) {
        this.def_total = this.def_total + this.defdef
      }
      // intervalがbpmに近い値になっているか判定
      if (this.btncnt > 0) {
        var diff = Math.abs(this.def[this.btncnt - 1] - 60 / parseInt(this.bpm) * 1000)
        this.interval_total = this.interval_total + diff

        console.log(this.defdef, diff)

        if ((this.defdef + diff) < 150) {
          this.commentchg('ultra good!!')
          this.superflgon()
        } else if ((this.defdef + diff) < 300) {
          this.commentchg('good!')
          this.goodflgon()
          this.superflgoff()
        } else {
          this.commentchg('bad...')
          this.goodflgoff()
          this.superflgoff()
        }
      }

      this.incrementbtncnt()
      //  100から、都度総マイナス値の平均の値を引いている。プラスになることも。調整値0.05を掛けている
      //  結果はvuexのcntにセット
      this.setcnt(Math.floor(100 - this.def_total / this.btncnt * 0.05 - this.interval_total / this.btncnt * 0.05))
    }

  } //  methods
} //  export default

</script>
<style scoped>
img {

}

.btnn {
  transition: filter .1s ease 0s;
  width: 80vw;
  margin: 0 auto;
}

.btnn:active {
  filter: brightness(1.5)
}

</style>
