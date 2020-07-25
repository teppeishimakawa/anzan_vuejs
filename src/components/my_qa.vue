<!---->
<template>
  <div>
      <div class="qa" :class="classObjC">{{question}} </div>
      <div class="comment" v-html="comment" :class="classObjB"></div>
      <div class="qa" :class="classObjB">{{this.answer}}</div>

    <div class="key_all">
      <div>
        <button class="key green" @click="edit(7)" @scroll.passive="onScroll" value="7" :class="classObjD">7</button>
        <button class="key green" @click="edit(8)" @scroll.passive="onScroll" value="8" :class="classObjD">8</button>
        <button class="key green" @click="edit(9)" @scroll.passive="onScroll" value="9" :class="classObjD">9</button>
      </div>
      <div>
        <button class="key green" @click="edit(4)" @scroll.passive="onScroll" value="4" :class="classObjD">4</button>
        <button class="key green" @click="edit(5)" @scroll.passive="onScroll" value="5" :class="classObjD">5</button>
        <button class="key green" @click="edit(6)" @scroll.passive="onScroll" value="6" :class="classObjD">6</button>
      </div>
      <div>
        <button class="key green" @click="edit(1)" @scroll.passive="onScroll" value="1" :class="classObjD">1</button>
        <button class="key green" @click="edit(2)" @scroll.passive="onScroll" value="2" :class="classObjD">2</button>
        <button class="key green" @click="edit(3)" @scroll.passive="onScroll" value="3" :class="classObjD">3</button>
      </div>
      <div>
        <button class="key green zero" @click="edit(0)" @scroll.passive="onScroll" value="0" :class="classObjD">0</button>
      </div>
      <div>
        <button class="enter" @click="result" @scroll.passive="onScroll" :class="classObjA">enter</button>
      </div>
  </div>

    <div class='btn_all'>
      <button class='green' :disabled="this.flg" @click="click">start</button>
      <button class='green' @click="reload">reload</button>
    </div>

</div>

</template>

<script>
import mixin from '@/components/mixin.js'
import store from '../store'
// this.$store.stateを略して呼べるようにするため
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      question: '',
      //  answer: '',
      comment: '',
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

  //  要素変化に関わらず、action起こした時は必ず結果返す必要あるのでcomputedでなくmethod
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    sttflgon () {
      store.commit('sttflgon')
    },
    okflgon () {
      store.commit('okflgon')
    },
    ngflgon () {
      store.commit('ngflgon')
    },
    answerexist (e) {
      store.commit('answerexist', this.answer + e)
    },
    answernon (e) {
      store.commit('answerexist', '')
    },
    aopen () {
      store.commit('aopen')
    },
    aclose () {
      store.commit('aclose')
    },

    edit (e) {
      //  this.answer = this.answer + e
      this.answerexist(e)
      this.comment = ''
    },

    result () {
      var chk
      //  edit()押せないように
      this.aclose()
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
        console.log(chk, parseInt(this.answer))
      } else {
        chk = this.num_arr1[this.random1] * this.num_arr2[this.random1_2]
      }
      if (parseInt(this.answer) === (Math.abs(chk))) {
        //  正解flg
        this.okflgon()
        this.next()
      } else {
        this.ngflgon()
        this.NGnext()
      }
    },

    click: function click () {
      if (!store.state.flg) { //  Vue.jsのmethodでsetInterval、setTimeoutを使う場合は「.bind(this)」つける必要あり
        //  sttflgon検知でstartshowing(),updateprogress()開始
        this.sttflgon()
        this.question = this.num_arr1[this.random1]
        setTimeout(function () { this.question = '' }.bind(this), 500)
        setTimeout(function () { this.question = this.num_arr2[this.random1_2] }.bind(this), 800)
        setTimeout(function () { this.question = '' }.bind(this), 1300)
        setTimeout(function () {
          this.comment = this.comment_arr[this.random2]
          this.aopen()
        }.bind(this), 1600)
        setTimeout(function () { this.comment = '' }.bind(this), 2200)
        //  document.getElementById('enter').style.pointerEvents = 'auto'
      } else {}
    },

    next () {
      this.increment()
      this.random1 = this.random(10)
      this.random1_2 = this.random(10)
      this.random2 = this.random(3)
      //  空白300ms,文字表示500ms
      this.comment = 'ok!'
      this.answernon()
      //  this.answer = ''
      setTimeout(function () { this.comment = '' }.bind(this), 300)
      setTimeout(function () { this.question = this.num_arr1[this.random1] }.bind(this), 600)
      setTimeout(function () { this.question = '' }.bind(this), 1100)
      setTimeout(function () { this.question = this.num_arr2[this.random1_2] }.bind(this), 1400)
      setTimeout(function () { this.question = '' }.bind(this), 1900)
      setTimeout(function () {
        this.comment = this.comment_arr[this.random2]
        this.aopen()
      }.bind(this), 2200)
      setTimeout(function () { this.comment = '' }.bind(this), 2800)
    },

    NGnext () {
      this.decrement()
      this.random1 = this.random(10)
      this.random1_2 = this.random(10)
      this.random2 = this.random(3)
      this.comment = 'NG...'
      //  this.answer = ''
      this.answernon()
      setTimeout(function () { this.comment = '' }.bind(this), 300)
      setTimeout(function () {
        this.question = this.num_arr1[this.random1]
        this.okflgon()
        //  document.getElementById('question').style.color = 'black'
      }.bind(this), 600)
      setTimeout(function () { this.question = '' }.bind(this), 1100)
      setTimeout(function () { this.question = this.num_arr2[this.random1_2] }.bind(this), 1400)
      setTimeout(function () { this.question = '' }.bind(this), 1900)
      setTimeout(function () {
        this.comment = this.comment_arr[this.random2]
        this.aopen()
      }.bind(this), 2200)
      setTimeout(function () { this.comment = '' }.bind(this), 2800)
    },

    reload () { location.reload() }

  //  methods
  },

  computed: {

    /* mapState内では、state === this.$store.state となる
    count1: state => state.count,
    'count1'は`state => return state.count` と同じ意味になる
    computedの値（つまり、computed: ここのこと）には、オブジェクト
    が入る必要がある。そのため、mapState(['hello', 'world']) はエラーとなる。
    オブジェクトがネストした状態になってしまうから
    */
    ...mapState(['open', 'flg', 'endflg', 'okflg', 'answer']),

    getendflg () {
      return store.getters.getendflg
    },

    classObjA: function () {
      return {
        //  canpoint: this.flg && !this.endflg,
        notpoint: !this.flg || this.endflg,
        textwhite: this.okflg,
        textred: !this.okflg
        //  green: this.okflg,
        //  red: !this.okflg
      }
    },

    classObjB: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.flg || this.endflg,
        textblack: this.okflg,
        textred: !this.okflg
      }
    },

    classObjC: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.flg || this.endflg
      }
    },

    classObjD: function () {
      return {
        textwhite: this.okflg,
        textred: !this.okflg,
        notpoint: !this.open
      }
    }

  },

  watch: {
    getendflg (num, old) {
      console.log('watch', num)
    }
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

.btn_all {
position: fixed;
bottom: 1%;
left: 50%;
transform: translate(-50%, 0%);
}

.key_all
{
text-align: center; /*align centerは親要素に設定する*/
position: fixed;
bottom: 6%;
left: 50%;
transform: translate(-50%, 0%);
width:330px;
z-index: 10000
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
