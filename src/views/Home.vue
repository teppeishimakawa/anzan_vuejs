<template>
  <div>
    <div id="title">フラッシュ暗算 5回正解して！</div>
    <div class="order_all">
      <div class="order" id="order_issue" style="visibility: hidden;" v-html="order_issue"></div>
      <div id="order_comment" v-html="order_comment"></div>
    </div>
    <!--div id="ans"  style='position: fixed;top: 5%; right:calc(50% - 100px);  width:200px;height:70px;text-align:center;font-size: 60px;color: black'></div-->
    <!--progress value="0" max="100" v-bind:value="val" id="myProgress"></progress-->
    <my-progress></my-progress>
    <my-counter></my-counter>
    <div id="score" v-html="score"></div>
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
        <button class="key green" @click="edit(0)" v-on:scroll.passive="onScroll" value="0">0</button>
      </div>
      <div>
        <button class="green" id="enter" @click="result" v-on:scroll.passive="onScroll">enter</button>
      </div>
    </div>
    <div class="btn_all">
      <button class="green" id="stt" @click="click">start</button>
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
    flgon () {
      store.commit('flgon')
    },

    edit: function edit (e) {
      this.order_issue = this.order_issue + e
      var chk
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
      } else {
        chk = this.num_arr1[this.random1] * this.num_arr2[this.random1_2]
      }
      if (parseInt(this.order_issue) === (Math.abs(chk))) {
        document.getElementById('enter').className = 'green'
      } else { document.getElementById('enter').className = 'red' }
    },

    result: function result () {
      var chk
      if (this.kigou[this.random2] === '+') {
        chk = this.num_arr1[this.random1] + this.num_arr2[this.random1_2]
        console.log(chk)
        console.log(this.order_issue)
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
      if (store.state.flg === 0) { //  Vue.jsのmethodでsetInterval、setTimeoutを使う場合は、それぞれに「.bind(this)」をつける必要あり
        document.getElementById('stt').disabled = true
        //  flgon検知でstartshowing(),updateprogress()開始
        this.flgon()
        document.getElementById('order_issue').style.visibility = 'visible'
        this.order_issue = this.num_arr1[this.random1]
        setTimeout(function () { this.order_issue = '' }.bind(this), 500)
        setTimeout(function () { this.order_issue = this.num_arr2[this.random1_2] }.bind(this), 800)
        setTimeout(function () { this.order_issue = '' }.bind(this), 1300)
        setTimeout(function () { this.order_comment = this.comment_arr[this.random2] }.bind(this), 1600)
        document.getElementById('enter').style.pointerEvents = 'auto'
      } else {}
    },

    next: function next () {
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

    NGnext: function NGnext () {
      this.decrement()
      this.score = store.state.cnt
      this.random1 = random(10)
      this.random1_2 = random(10)
      this.random2 = random(3)
      document.getElementById('order_issue').style.color = 'red'
      this.order_issue = 'NG...'
      this.order_comment = ''
      setTimeout(function () { this.order_issue = '' }.bind(this), 300)
      setTimeout(function () {
        this.order_issue = this.num_arr1[this.random1]
        document.getElementById('order_issue').style.color = 'black'
      }.bind(this), 600)
      setTimeout(function () { this.order_issue = '' }.bind(this), 1100)
      setTimeout(function () { this.order_issue = this.num_arr2[this.random1_2] }.bind(this), 1400)
      setTimeout(function () { this.order_issue = '' }.bind(this), 1900)
      setTimeout(function () { this.order_comment = this.comment_arr[this.random2] }.bind(this), 2200)
    },

    reload: function () { location.reload() }

  //  methods
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
