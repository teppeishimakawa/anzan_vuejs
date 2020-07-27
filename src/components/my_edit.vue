<!--数字ボタンと表示-->
<template>
  <div>
      <div class="qa" :class="classObjB">{{this.answer}}</div>
<!--//連続で高速ボタン押しした時の反応良くするために{passive: true}超重要！-->
    <div class="key_all">
      <div>
        <!--連続で高速ボタン押しした時の反応良くするために@click.passive="edit(7)"の記述とbodyのontouchstart=""消去、超重要-->
        <button class="key green" @click.passive="edit(7)" :class="classObjD">7</button>
        <button class="key green" @click.passive="edit(8)" :class="classObjD">8</button>
        <button class="key green" @click.passive="edit(9)" :class="classObjD">9</button>
      </div>
      <div>
        <button class="key green" @click.passive="edit(4)" :class="classObjD">4</button>
        <button class="key green" @click.passive="edit(5)" :class="classObjD">5</button>
        <button class="key green" @click.passive="edit(6)" :class="classObjD">6</button>
      </div>
      <div>
        <button class="key green" @click.passive="edit(1)" :class="classObjD">1</button>
        <button class="key green" @click.passive="edit(2)" :class="classObjD">2</button>
        <button class="key green" @click.passive="edit(3)" :class="classObjD">3</button>
      </div>
      <div>
        <button class="key green zero" @click.passive="edit(0)" :class="classObjD">0</button>
      </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['open', 'sttflg', 'endflg', 'okflg', 'ngflg', 'answer', 'comment']),

    classObjB: function () {
      return {
        //  canlook: this.flg && !this.endflg,
        notlook: !this.sttflg || this.endflg,
        textblack: this.okflg,
        textred: this.ngflg
      }
    },

    classObjD: function () {
      return {
        textwhite: this.okflg,
        textred: this.ngflg,
        notpoint: !this.open
      }
    }

  },

  methods: {
  // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'commentchg']),

    edit (e) {
      //  store.commit('answerexist', this.answer + e)
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
