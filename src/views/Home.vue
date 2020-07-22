<template>
  <div>
    <div id="title">フラッシュ暗算 5回正解して！</div>
    <div class="order_all">
      <div class="order" id="order_issue"  v-html="order_issue" :class="classObjB"></div>
      <div id="order_comment" v-html="order_comment" :class="classObjC"></div>
    </div>
    <!--div id="ans"  style='position: fixed;top: 5%; right:calc(50% - 100px);  width:200px;height:70px;text-align:center;font-size: 60px;color: black'></div-->
    <!--progress value="0" max="100" v-bind:value="val" id="myProgress"></progress-->
    <my-progress></my-progress>
    <my-counter></my-counter>
    <div id="score" v-html="score" :class="{ textred: !this.$store.state.okflg}"></div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="key_all">
      <div>
        <button class="key green" type="button" v-on:click="edit(7)" v-on:scroll.passive="onScroll" value="7">7</button>
        <button class="key green" @click="edit(8)" v-on:scroll.passive="onScroll" value="8">8</button>
        <button class="key green" @click="edit(9)" v-on:scroll.passive="onScroll" value="9">9</button>
      </div>
      <div>
        <button class="key green" @click="edit(4)" v-on:scroll.passive="onScroll" value="4">4</button>
        <button class="key green" @click="edit(5)" v-on:scroll.passive="onScroll" value="5">5</button>
        <button class="key green" @click="edit(6)" v-on:scroll.passive="onScroll" value="6">6</button>
      </div>
      <div>
        <button class="key green" @click="edit(1)" v-on:scroll.passive="onScroll" value="1">1</button>
        <button class="key green" @click="edit(2)" v-on:scroll.passive="onScroll" value="2">2</button>
        <button class="key green" @click="edit(3)" v-on:scroll.passive="onScroll" value="3">3</button>
      </div>
      <div>
        <button class="key green zero" @click="edit(0)" v-on:scroll.passive="onScroll" value="0">0</button>
      </div>
      <div>
        <button class="enter" @click="result" v-on:scroll.passive="onScroll" :class="classObjA">enter</button>
      </div>
    </div>
    <div class="btn_all">
      <button class="green" id="stt" :disabled="this.$store.state.flg" @click="click">start</button>
      <button class="green" @click="reload">reload</button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import myProgress from '@/components/my_progress.vue'
import myCounter from '@/components/my_counter.vue'
import store from '../store'

export default {
  name: 'Home',
  components: {
    //  html要素名:コンポーネント名
    myProgress,
    myCounter
  },

  //  mixins: [progress_mixin],

  data: function () {
    return {
      order_issue: '',
      order_comment: '',
      score: '',
      num_arr1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      num_arr2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      comment_arr: ['&nbsp;&nbsp;足して！', '&nbsp;&nbsp;足して！', '&nbsp;&nbsp;掛けて！'],
      kigou: ['+', '+', '*'],
      random1: random(10),
      random1_2: random(10),
      random2: random(3)
    }
  },

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

    edit (e) {
      this.order_issue = this.order_issue + e
      var chk
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
      } else {
        chk = this.num_arr1[this.random1] * this.num_arr2[this.random1_2]
      }
      if (parseInt(this.order_issue) === (Math.abs(chk))) {
        //  this.okflg()
        //  document.getElementById('enter').className = 'green'
      } else { /* this.ngflg() */ }
    },

    result () {
      var chk
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
        console.log(chk)
      } else {
        chk = this.num_arr1[this.random1] * this.num_arr2[this.random1_2]
      }
      if (parseInt(this.order_issue) === (Math.abs(chk))) {
        this.next()
      } else {
        this.NGnext()
      }
      //  this.order_issue="";
    },

    click: function click () {
      if (!store.state.flg) { //  Vue.jsのmethodでsetInterval、setTimeoutを使う場合は、それぞれに「.bind(this)」をつける必要あり
        //  sttflg検知でstartshowing(),updateprogress()開始
        this.sttflgon()
        this.order_issue = this.num_arr1[this.random1]
        setTimeout(function () { this.order_issue = '' }.bind(this), 500)
        setTimeout(function () { this.order_issue = this.num_arr2[this.random1_2] }.bind(this), 800)
        setTimeout(function () { this.order_issue = '' }.bind(this), 1300)
        setTimeout(function () { this.order_comment = this.comment_arr[this.random2] }.bind(this), 1600)
        //  document.getElementById('enter').style.pointerEvents = 'auto'
      } else {}
    },

    next () {
      this.increment()
      console.log()
      this.score = store.state.cnt
      this.random1 = random(10)
      this.random1_2 = random(10)
      this.random2 = random(3)
      //  空白300ms,文字表示500ms
      this.order_issue = 'ok!'
      this.order_comment = ''
      setTimeout(function () { this.order_issue = '' }.bind(this), 300)
      setTimeout(function () { this.order_issue = this.num_arr1[this.random1] }.bind(this), 600)
      setTimeout(function () { this.order_issue = '' }.bind(this), 1100)
      setTimeout(function () { this.order_issue = this.num_arr2[this.random1_2] }.bind(this), 1400)
      setTimeout(function () { this.order_issue = '' }.bind(this), 1900)
      setTimeout(function () { this.order_comment = this.comment_arr[this.random2] }.bind(this), 2200)
    },

    NGnext () {
      this.decrement()
      this.score = store.state.cnt
      this.random1 = random(10)
      this.random1_2 = random(10)
      this.random2 = random(3)
      this.ngflg()
      //  document.getElementById('order_issue').style.color = 'red'
      this.order_issue = 'NG...'
      this.order_comment = ''
      setTimeout(function () { this.order_issue = '' }.bind(this), 300)
      setTimeout(function () {
        this.order_issue = this.num_arr1[this.random1]
        this.okflg()
        //  document.getElementById('order_issue').style.color = 'black'
      }.bind(this), 600)
      setTimeout(function () { this.order_issue = '' }.bind(this), 1100)
      setTimeout(function () { this.order_issue = this.num_arr2[this.random1_2] }.bind(this), 1400)
      setTimeout(function () { this.order_issue = '' }.bind(this), 1900)
      setTimeout(function () { this.order_comment = this.comment_arr[this.random2] }.bind(this), 2200)
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
        green: this.$store.state.okflg,
        red: !this.$store.state.okflg
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
    }
  },

  watch: {
    getendflg (num, old) {
      console.log('watch', num)
    }
  }

  //  methods:{ edit:function(e){this.order_issue=e}},
  //  export default
}

function random (num) {
  return Math.floor(Math.random() * num)
}

</script>

<style>

</style>
