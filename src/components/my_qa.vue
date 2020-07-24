<!---->
<template>
  <div>
      <div id="question" >{{question}}</div>
      <div id="comment" v-html="comment" :class="classObjB"></div>
      <div :class="classObjB">{{this.$store.state.answer}}</div>
    <!--div id="ans"  style='position: fixed;top: 5%; right:calc(50% - 100px);  width:200px;height:70px;text-align:center;font-size: 60px;color: black'></div-->
    <!--div id="score" v-html="score" :class="{ textred: !this.$store.state.okflg}"></div-->
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

    <div class="btn_all">
      <button class="green" id="stt" :disabled="this.$store.state.flg" @click="click">start</button>
      <button class="green" @click="reload">reload</button>
    </div>

</div>
</template>

<script>
import mixin from '@/components/mixin.js'
import store from '../store'

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

  //  action起こした時は必ず結果返す必要あるのでcomputedでなくmethod
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
    okflg () {
      store.commit('okflg')
    },
    ngflg () {
      store.commit('ngflg')
    },
    answer (e) {
      store.commit('answer', store.state.answer + e)
    },
    answernon (e) {
      store.commit('answer', '')
    },
    aopen () {
      store.commit('aopen')
    },
    aclose () {
      store.commit('aclose')
    },

    edit (e) {
      //  this.answer = this.answer + e
      this.answer(e)
    },

    result () {
      var chk
      this.aclose()
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
        console.log(chk, parseInt(store.state.answer))
      } else {
        chk = this.num_arr1[this.random1] * this.num_arr2[this.random1_2]
      }
      if (parseInt(store.state.answer) === (Math.abs(chk))) {
        this.okflg()
        this.next()
      } else {
        this.ngflg()
        this.NGnext()
      }
    },

    click: function click () {
      if (!store.state.flg) { //  Vue.jsのmethodでsetInterval、setTimeoutを使う場合は、それぞれに「.bind(this)」をつける必要あり
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
        this.okflg()
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
    getendflg () {
      return store.getters.getendflg
    },

    classObjA: function () {
      return {
        //  canpoint: this.$store.state.flg && !this.$store.state.endflg,
        notpoint: !this.$store.state.flg || this.$store.state.endflg,
        textwhite: this.$store.state.okflg,
        textred: !this.$store.state.okflg
        //  green: this.$store.state.okflg,
        //  red: !this.$store.state.okflg
      }
    },

    classObjB: function () {
      return {
        //  canlook: this.$store.state.flg && !this.$store.state.endflg,
        notlook: !this.$store.state.flg || this.$store.state.endflg,
        textblack: this.$store.state.okflg,
        textred: !this.$store.state.okflg
      }
    },

    classObjC: function () {
      return {
        //  canlook: this.$store.state.flg && !this.$store.state.endflg,
        notlook: !this.$store.state.flg || this.$store.state.endflg
      }
    },

    classObjD: function () {
      return {
        textwhite: this.$store.state.okflg,
        textred: !this.$store.state.okflg,
        notpoint: !this.$store.state.open
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

</style>
