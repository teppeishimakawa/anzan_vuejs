<!---->
<template>
  <div>
      <div class="qa" :class="classObjC">{{question}} </div>
      <div class="comment" v-html="comment" :class="classObjB"></div>
      <div>
        <button class="enter" @click="enter" @scroll.passive="onScroll" :class="classObjA">enter</button>
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
      num_arr1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      num_arr2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      comment_arr: ['&nbsp;&nbsp;足して！', '&nbsp;&nbsp;足して！', '&nbsp;&nbsp;掛けて！'],
      kigou: ['+', '+', '*'],
      random1: this.random(10),
      random1_2: this.random(10),
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
    ...mapState(['sttflg', 'endflg', 'okflg', 'answer', 'comment', 'question']),
    ...mapGetters(['getsttflg', 'getendflg']),

    classObjA: function () {
      return {
        //  canpoint: this.flg && !this.endflg,
        notpoint: !this.sttflg || this.endflg,
        textwhite: this.okflg,
        textred: !this.okflg
        //  green: this.okflg,
        //  red: !this.okflg
      }
    },

    classObjB: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.sttflg || this.endflg,
        textblack: this.okflg,
        textred: !this.okflg
      }
    },

    classObjC: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.sttflg || this.endflg
      }
    }

  },

  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      this.questionchg(this.num_arr1[this.random1])
      this.quiz(500)
    },

    getendflg (num, old) {
      console.log('watch', num)
    }
  },

  //  要素変化に関わらず、action起こした時は必ず結果返す必要あるのでcomputedでなくmethod
  methods: {
  // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'aopen', 'aclose', 'okflgon', 'ngflgon', 'increment', 'decrement', 'commentchg', 'questionchg']),

    enter () {
      var chk
      //  edit()押せないようにaclose()発動
      //  store.commit('aclose')
      this.aclose()
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
        console.log(chk, parseInt(this.answer))
      } else {
        chk = this.num_arr1[this.random1] * this.num_arr2[this.random1_2]
      }
      if (parseInt(this.answer) === (Math.abs(chk))) {
        //  正解flg
        //  store.commit('okflgon')
        this.okflgon()
        this.next()
      } else {
        //  store.commit('ngflgon')
        this.ngflgon()
        this.NGnext()
      }
    },

    next () {
      //  store.commit('increment')
      this.increment()
      this.doRandom('ok')
      //  store.commit('answerexist', '')
      this.answerexist('')
      //  this.answer = ''
      setTimeout(function () { this.commentchg('') }.bind(this), 300)
      setTimeout(function () { this.questionchg(this.num_arr1[this.random1]) }.bind(this), 600)
      this.quiz(1100)
    },

    NGnext () {
      //  store.commit('decrement')
      this.decrement()
      this.doRandom('NG...')
      //  store.commit('answerexist', '')
      this.answerexist('')
      setTimeout(function () { this.commentchg() }.bind(this), 300)
      setTimeout(function () {
        this.questionchg(this.num_arr1[this.random1])
        //  store.commit('okflgon')
        this.okflgon()
        //  document.getElementById('question').style.color = 'black'
      }.bind(this), 600)
      this.quiz(1100)
    },

    quiz (a) {
      setTimeout(function () { this.questionchg('') }.bind(this), a)
      setTimeout(function () { this.questionchg(this.num_arr2[this.random1_2]) }.bind(this), a + 300)
      setTimeout(function () { this.questionchg('') }.bind(this), a + 800)
      setTimeout(function () {
        this.commentchg(this.comment_arr[this.random2])
        //  store.commit('aopen')
        this.aopen()
      }.bind(this), a + 1100)
      setTimeout(function () { this.commentchg('') }.bind(this), a + 1700)
      //  document.getElementById('enter').style.pointerEvents = 'auto'
    },

    doRandom (a) {
      this.random1 = this.random(10)
      this.random1_2 = this.random(10)
      this.random2 = this.random(3)
      //  空白300ms,文字表示500ms
      this.commentchg(a)
    }
  //  methods
  }
  //  methods:{ edit:function(e){this.question=e}},
  //  export default
}

</script>
<style scoped>
button {
    display: inline-block;
    color: #fff;
    background-color: #42b983;
    border-color: #2e6da4;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    width:80px;
    margin:10px;
}

button[disabled] {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: .65;
}

.key
{
display:inline;
width:100px;
margin: 5px 5px;
padding: 15px;
z-index: 100;
}

.zero
{
margin-left:-215px
}

.enter
{
display:inline;
width:200px;
padding: 25px 0px 25px 0px;
margin:10px 0px 20px 0px;
z-index: 100;
text-align: center; /*align centerは親要素に設定する*/
position: fixed;
bottom: 6%;
left: 50%;
transform: translate(-50%, 0%);

}

.qa
{
  position: fixed;
    top: 23%;
  right: calc(50% - 100px);
display:block;
font-size: 60px;
width:200px;
height:100px;
margin:0px 0px;
text-align: center;
z-index: 101;
}

.comment
{
  position: fixed;
  top: 25%;
  right: calc(50% - 100px);
display:block;
font-size: 35px;
width:200px;
height:100px;
margin:0px 0px;
text-align: center;
z-index: 101;
}
</style>
