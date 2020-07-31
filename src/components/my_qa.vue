<!---->
<template>
  <div>
    <div class="qa_wrap">
    <img class="qa" alt='' :src='question' :class="classObjC"/>
    <div class="comment" v-html="comment" :class="classObjB"></div>
    </div>
    <div class="key_all" >
      <!--require('../assets/gu.png')されgu.pngに自動的に名前解決されるのでjs中で呼び出す時はgu.png-->
      <img class="enter" @mousedown.prevent="enterGu" @touchstart.prevent="enterGu" :class="classObjAgu" src='../assets/gu.png' />
      <img class="enter" @mousedown.prevent="enterCho" @touchstart.prevent="enterCho" :class="classObjAcho" src='../assets/cho.png' />
      <img class="enter" @mousedown.prevent="enterPa" @touchstart.prevent="enterPa" :class="classObjApa" src='../assets/pa.png'>
    </div>
  </div>
</template>
<script>
import mixin from '@/components/mixin.js'
// import store from '../store'
// this.$store.stateを略して呼べるようにするため
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      num_arr1: ['gu.png', 'cho.png', 'pa.png'],
      comment_arr: ['&nbsp;&nbsp;&nbsp;勝って！', '&nbsp;&nbsp;&nbsp;負けて！', '&nbsp;&nbsp;引き分けて！'],
      random1: this.random(3),
      random2: this.random(3)
    }
  },

  //  random関数
  mixins: [mixin],

  computed: {
    /* mapState内では、state === this.$store.state となる
    count1: state => state.count,
    'count1'は`state => return state.count` と同じ意味になる
    computedの値（つまり、computed: ここのこと）には、オブジェクト
    が入る必要がある。そのため、mapState(['hello', 'world']) はエラーとなる。
    オブジェクトがネストした状態になってしまうから。
    this.$store.state.xxxxをthis.xxxで呼べるようにする
    */
    ...mapState(['sttflg', 'endflg', 'okflg', 'ngflg', 'answer', 'comment', 'question']),
    ...mapGetters(['getsttflg', 'getendflg']),

    classObjAgu: function () {
      return {
        //  randam関数決まった時点で各ボタンが押された際の色class付与している
        notpoint: !this.sttflg || this.endflg,
        greenBe: this.okflgon,
        redBe: this.ngflgon
        /*
        greenBe: (this.random2 === 0 && this.random1 === 1) || (this.random2 === 1 && this.random1 === 2) || (this.random2 === 2 && this.random1 === 0),
        redBe: (this.random2 === 0 && this.random1 === 2) || (this.random2 === 1 && this.random1 === 0) || (this.random2 === 2 && this.random1 === 1) || (this.random2 === 0 && this.random1 === 0) || (this.random2 === 1 && this.random1 === 1) || (this.random2 === 2 && this.random1 === 2)
        */
      }
    },
    classObjAcho: function () {
      return {
        //  canpoint: this.flg && !this.endflg,
        notpoint: !this.sttflg || this.endflg,
        greenBe: this.okflgon,
        redBe: this.ngflgon
        /*
        greenBe: (this.random2 === 0 && this.random1 === 2) || (this.random2 === 1 && this.random1 === 0) || (this.random2 === 2 && this.random1 === 1),
        redBe: (this.random2 === 0 && this.random1 === 1) || (this.random2 === 1 && this.random1 === 2) || (this.random2 === 2 && this.random1 === 0) || (this.random2 === 0 && this.random1 === 0) || (this.random2 === 1 && this.random1 === 1) || (this.random2 === 2 && this.random1 === 2)
        */
      }
    },
    classObjApa: function () {
      return {
        //  canpoint: this.flg && !this.endflg,
        notpoint: !this.sttflg || this.endflg,
        greenBe: this.okflgon,
        redBe: this.ngflgon
        /*
        greenBe: (this.random2 === 0 && this.random1 === 0) || (this.random2 === 1 && this.random1 === 1) || (this.random2 === 2 && this.random1 === 2),
        redBe: (this.random2 === 0 && this.random1 === 1) || (this.random2 === 1 && this.random1 === 2) || (this.random2 === 2 && this.random1 === 0) || (this.random2 === 0 && this.random1 === 2) || (this.random2 === 1 && this.random1 === 0) || (this.random2 === 2 && this.random1 === 1)
        */
      }
    },

    classObjB: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.sttflg || this.endflg,
        textgreen: this.okflg,
        textred: this.ngflg
      }
    },

    classObjC: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.sttflg || this.endflg,
        redSudden: this.ngflg,
        greenSudden: this.okflg
      }
    }

  },

  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      this.questionchg(this.num_arr1[this.random1])
      console.log(this.num_arr1[this.random1])
      this.commentchg(this.comment_arr[this.random2])
    },

    getendflg (num, old) {
      console.log('watch', num)
    }
  },

  //  要素変化に関わらず、action起こした時は必ず結果返す必要あるのでcomputedでなくmethod
  methods: {
    // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'aopen', 'aclose', 'okflgon', 'okflgoff', 'ngflgon', 'ngflgoff', 'increment', 'decrement', 'commentchg', 'questionchg']),

    enterGu () {
      //  edit()押せないようにaclose()発動
      //  store.commit('aclose')
      this.aclose()
      this.result(1, 2, 0)
    },

    enterCho () {
      //  edit()押せないようにaclose()発動
      //  store.commit('aclose')
      this.aclose()
      this.result(2, 0, 1)
    },

    enterPa () {
      //  edit()押せないようにaclose()発動
      //  store.commit('aclose')
      this.aclose()
      this.result(0, 1, 2)
    },

    next () {
      this.increment()
      this.doRandom('ok')
      this.answerexist('')
      setTimeout(function () {
        this.commentchg('')
        this.questionchg('')
      }.bind(this), 300)
      setTimeout(function () {
        this.questionchg(this.num_arr1[this.random1])
        this.okflgoff()
      }.bind(this), 600)
      this.quiz(700)
    },

    NGnext () {
      this.decrement()
      this.doRandom('NG...')
      this.answerexist('')
      setTimeout(function () {
        this.commentchg('')
        this.questionchg('')
      }.bind(this), 300)
      setTimeout(function () {
        this.questionchg(this.num_arr1[this.random1])
        this.ngflgoff()
      }.bind(this), 600)
      this.quiz(700)
    },

    quiz (a) {
      //  setTimeout(function () { this.questionchg('') }.bind(this), a)
      setTimeout(function () {
        this.commentchg(this.comment_arr[this.random2])
        //  store.commit('aopen')
        this.aopen()
      }.bind(this), a)
      //  setTimeout(function () { this.commentchg('') }.bind(this), a + 1700)
      //  document.getElementById('enter').style.pointerEvents = 'auto
    },

    doRandom (a) {
      this.random1 = this.random(3)
      this.random2 = this.random(3)
      //  空白300ms,文字表示500ms
      this.commentchg(a)
    },

    result (a, b, c) {
      //  random2:勝ち:0、負け:1、あいこ:2
      //  gu出し：勝って cho,負けてpa,引き分けてgu勝ちパターンa,b,c: 1 2 0
      //  cho出し：勝って pa, 負けて gu, 引き分けて cho 勝ちパターンa,b,c: 2 0 1
      //  pa出し：勝って gu, 負けて cho, 引き分けて pa  勝ちパターンa,b,c: 0 1 2
      if ((this.random2 === 0 && this.random1 === a) || (this.random2 === 1 && this.random1 === b) || (this.random2 === 2 && this.random1 === c)) {
        this.okflgon()
        this.next()
      } else {
        this.ngflgon()
        this.NGnext()
      }
    }
    //  methods
  }
  //  methods:{ edit:function(e){this.question=e}},
  //  export default
}

</script>
<style scoped>

img{
  border-style:none;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .3));
}

.key {
  display: inline;
  width: 100px;
  margin: 5px 5px;
  padding: 15px;
  z-index: 100;
}

.zero {
  margin-left: -215px
}

.enter {
  display: inline;
  width: 90px;
  padding: 5px 0px 5px 0px;
  margin: 5px 10px 5px 10px;
  z-index: 100;
  /*align centerは親要素に設定する*/
  transform: translate(0%, 0%);
}

.key_all
{
text-align: center; /*align centerは親要素に設定する*/
position: fixed;
bottom: 10%;
left: 50%;
transform: translate(-50%, -50%);
width:350px;
z-index: 10000
}

.qa_wrap
{
text-align: center;
position: fixed;
top: 35%;
left: 50%;
transform: translate(-50%, -50%);
width:330px;
z-index: 10000
}

/*何故かposition:fixにするとsafariで色が狂う*/
.qa {
  display: inline;
  width: 110px;
  z-index: 100;
}

.comment {
  position: absolute;
  top: 50%;
  transform: translate(0,70%);
  right: calc(50% - 100px);
  display: block;
  font-size: 20px;
  width: 200px;
  height: 100px;
  margin: 0px 0px;
  text-align: center;
  z-index: 101;
}

/*何故かhome.vueのsuddenは効かなかったためこちらにも。srcが定まらないからか。*/
.redSudden {
    filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.greenSudden {
    filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

</style>
