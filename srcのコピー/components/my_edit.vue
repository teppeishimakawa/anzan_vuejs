<!--数字ボタンと表示-->
<template>
  <div>
      <div class="qa" :class="classObjB">{{this.answer}}</div>
<!--//連続で高速ボタン押しした時の反応良くするために{passive: true}超重要！-->
    <div class="key_all">
      <div>
        <!--連続で高速ボタン押しした時の反応良くするために@click.passive="edit(7)"の記述とbodyのontouchstart=""消去、超重要
          *vuetify実装すると今度は2度入力になるのでpassive外す必要あり-->
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(7)" :class="classObjD">7</v-btn>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(8)" :class="classObjD">8</v-btn>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(9)" :class="classObjD">9</v-btn>
      </div>
      <div>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(4)" :class="classObjD">4</v-btn>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(5)" :class="classObjD">5</v-btn>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(6)" :class="classObjD">6</v-btn>
      </div>
      <div>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(1)" :class="classObjD">1</v-btn>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(2)" :class="classObjD">2</v-btn>
        <v-btn color='info' large class="key green ma-1 mx-3" @click="edit(3)" :class="classObjD">3</v-btn>
      </div>
      <div>
        <v-btn color='info' large class="key green zero ma-1" @click="edit(0)" :class="classObjD">0</v-btn>
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
        notlook: !this.sttflg || this.endflg
      }
    },

    classObjD: function () {
      return {
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

.key_all
{
text-align: center;
position: fixed;
bottom: 23%;
left: 50%;
transform: translate(-50%, 0%);
width:330px;
z-index: 10000
}
/*
.key_all
{
text-align: center; align centerは親要素に設定する
position: fixed;
bottom: 25%;
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
*/
.qa
{
  position: fixed;
    top: 23%;
  right: calc(50% - 100px);
display:block;
font-size: 60px;
width:200px;
margin:0px 0px;
text-align: center;
z-index: 101;
}

.zero
{
margin-left:-215px
}

</style>
