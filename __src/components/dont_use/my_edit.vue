<!--数字ボタンと入力した数字表示コンポーネント -->
<template>
  <div>
      <div class="qa" :class="classObjB">{{this.answer}}</div>

    <div class="key_all">
      <div>
        <button class="key green" @click="edit(7)" @scroll.passive="onScroll" :class="classObjD">7</button>
        <button class="key green" @click="edit(8)" @scroll.passive="onScroll" :class="classObjD">8</button>
        <button class="key green" @click="edit(9)" @scroll.passive="onScroll" :class="classObjD">9</button>
      </div>
      <div>
        <button class="key green" @click="edit(4)" @scroll.passive="onScroll" :class="classObjD">4</button>
        <button class="key green" @click="edit(5)" @scroll.passive="onScroll" :class="classObjD">5</button>
        <button class="key green" @click="edit(6)" @scroll.passive="onScroll" :class="classObjD">6</button>
      </div>
      <div>
        <button class="key green" @click="edit(1)" @scroll.passive="onScroll" :class="classObjD">1</button>
        <button class="key green" @click="edit(2)" @scroll.passive="onScroll" :class="classObjD">2</button>
        <button class="key green" @click="edit(3)" @scroll.passive="onScroll" :class="classObjD">3</button>
      </div>
      <div>
        <button class="key green zero" @click="edit(0)" @scroll.passive="onScroll" :class="classObjD">0</button>
      </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['open', 'sttflg', 'endflg', 'okflg', 'answer', 'comment']),

    classObjB: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.sttflg || this.endflg,
        textblack: this.okflg,
        textred: !this.okflg
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

  methods: {
  // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'commentchg']),

    edit (e) {
      this.answerexist(this.answer + e)
      this.commentchg('')
    }

  }

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

.key_all
{
text-align: center; /*align centerは親要素に設定する*/
position: fixed;
bottom: 21%;
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

</style>
