<!--問題表示、指令コメント表示、回答ボタン表示-->
<template>
  <div>
    <div class="qa_wrap">
      <div style="position:fixed;top:-10vh;">

            <img class="qa" alt='' :src="question[0]" :class="classObjC" style="width:23%;" @click="clickA(question[0])"/>
            <img class="qa" alt='' :src="question[1]" :class="classObjC" style="width:23%;" @click="clickA(question[1])"/>
            <img class="qa" alt='' :src="question[2]" :class="classObjC" style="width:23%;" @click="clickA(question[2])"/>
            <img class="qa" alt='' :src="question[3]" :class="classObjC" style="width:23%;" @click="clickA(question[3])"/>
            <img class="qa" alt='' :src="question[4]" :class="classObjC" style="width:23%;" @click="clickA(question[4])"/>
            <img class="qa" alt='' :src="question[5]" :class="classObjC" style="width:23%;" @click="clickA(question[5])"/>
            <img class="qa" alt='' :src="question[6]" :class="classObjC" style="width:23%;" @click="clickA(question[6])"/>
            <img class="qa" alt='' :src="question[7]" :class="classObjC" style="width:23%;" @click="clickA(question[7])"/>

      </div>
       <div style="position:fixed;top:25vh;">

            <img class="qa" alt='' :src="question2[0]" :class="classObjC" style="width:23%;" @click="clickA(question2[0])"/>
            <img class="qa" alt='' :src="question2[1]" :class="classObjC" style="width:23%;" @click="clickA(question2[1])"/>
            <img class="qa" alt='' :src="question2[2]" :class="classObjC" style="width:23%;" @click="clickA(question2[2])"/>
            <img class="qa" alt='' :src="question2[3]" :class="classObjC" style="width:23%;" @click="clickA(question2[3])"/>
            <img class="qa" alt='' :src="question2[4]" :class="classObjC" style="width:23%;" @click="clickA(question2[4])"/>
            <img class="qa" alt='' :src="question2[5]" :class="classObjC" style="width:23%;" @click="clickA(question2[5])"/>
            <img class="qa" alt='' :src="question2[6]" :class="classObjC" style="width:23%;" @click="clickA(question2[6])"/>
            <img class="qa" alt='' :src="question2[7]" :class="classObjC" style="width:23%;" @click="clickA(question2[7])"/>

      </div>

      <div class="comment" v-html="comment" :class="classObjB"></div>
    </div>
    <div class="key_all" >
      <!--require('../assets/gu.png')されgu.pngに自動的に名前解決されるのでjs中で呼び出す時はgu.png-->

    </div>
  </div>
</template>
<script>
import shuffle from '@/components/mixin/shuffle.js'
// import store from '../store'
// this.$store.stateを略して呼べるようにするため
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      num_arr1: [
        require('../assets/ashiato.png'), require('../assets/born.png'), require('../assets/bow.png'),
        require('../assets/bug.png'), require('../assets/cat.png'), require('../assets/chou.png'),
        require('../assets/dog.png'), require('../assets/dolphin2.png'), require('../assets/dolphin.png'),
        require('../assets/fish.png'), require('../assets/fish2.png'), require('../assets/fish3.png'),
        require('../assets/fish4.png'), require('../assets/frog.png'), require('../assets/gachou.png'),
        require('../assets/heart.png'), require('../assets/horse.png'), require('../assets/house.png'),
        require('../assets/kame.png'), require('../assets/maru.png'), require('../assets/medic.png'),
        require('../assets/panda.png'), require('../assets/pen.png'), require('../assets/sai.png'),
        require('../assets/tanba.png'), require('../assets/tori.png'), require('../assets/tori2.png'),
        require('../assets/tori3.png'), require('../assets/uma.png'), require('../assets/zebla.png'),
        require('../assets/zou.png')],
      comment_arr: ['&nbsp;同じマークを見つけて！']

    }
  },

  //  random関数
  mixins: [shuffle],

  computed: {
    ...mapState(['sttflg', 'endflg', 'okflg', 'ngflg', 'answer', 'comment', 'question', 'question2', 'src', 'src2']),
    ...mapGetters(['getsttflg', 'getendflg']),

    classObjAgu: function () {
      return {
        notpoint: !this.sttflg || this.endflg,
        greenBe: this.okflgon,
        redBe: this.ngflgon
      }
    },

    classObjB: function () {
      return {
        notlook: !this.sttflg || this.endflg,
        textgreen: this.okflg,
        textred: this.ngflg
      }
    },

    classObjC: function () {
      return {
        notlook: !this.sttflg || this.endflg,
        redSudden: this.ngflg,
        greenSudden: this.okflg
      }
    }

  },

  watch: {
    getsttflg (num, old) {
      console.log('watch', num)
      //  31要素をshuffleしbuf1にだいn
      var buf0 = this.shuffleAry(this.num_arr1)
      var buf1 = (buf0).slice(0, 8)
      var buf2 = (buf0).slice(7, 15)

      this.questionchg(this.shuffleAry((buf0).slice(0, 8)))
      this.question2chg(this.shuffleAry((buf0).slice(7, 15)))
      //  var buf2 = (buf1).slice(7, 15)
      //  this.question2chg(this.shuffleAry(buf2))
      console.log(buf1)
      console.log(buf2)
      console.log(this.question)
      console.log(this.question2)
    },

    getendflg (num, old) {
      console.log('watch', num)
    }
  },

  methods: {
    // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['answerexist', 'aopen', 'aclose', 'okflgon', 'okflgoff', 'ngflgon', 'ngflgoff', 'increment', 'decrement', 'commentchg', 'questionchg', 'question2chg', 'srcchg', 'src2chg']),

    clickA (value) {
      //  edit()押せないようにaclose()発動
      //  store.commit('aclose')
      this.srcchg(value)
      console.log(value)
      this.aclose()
      this.result()
    },

    clickB (value) {
      //  edit()押せないようにaclose()発動
      //  store.commit('aclose')
      this.src2chg(value)
      console.log(value)
      this.aclose()
      this.result()
    },

    next () {
      this.increment()
      this.doRandom('ok')
      this.answerexist('')
      this.questionchg('')
      this.question2chg('')
      this.srcchg('')
      this.src2chg('')
      setTimeout(function () {
        this.commentchg('')
        this.questionchg('')
      }.bind(this), 300)
      setTimeout(function () {
        var buf0 = this.shuffleAry(this.num_arr1)
        var buf1 = (buf0).slice(0, 8)
        var buf2 = (buf0).slice(7, 15)
        this.questionchg(this.shuffleAry((buf0).slice(0, 8)))
        this.question2chg(this.shuffleAry((buf0).slice(7, 15)))
        console.log(buf1)
        console.log(buf2)
        console.log(this.question)
        console.log(this.question2)

        this.okflgoff()
      }.bind(this), 600)
      this.quiz(700)
    },

    NGnext () {
      this.decrement()
      this.doRandom('NG...')
      this.answerexist('')
      this.questionchg('')
      this.question2chg('')
      this.srcchg('')
      this.src2chg('')
      setTimeout(function () {
        this.commentchg('')
        this.questionchg('')
      }.bind(this), 300)
      setTimeout(function () {
        var buf0 = this.shuffleAry(this.num_arr1)
        var buf1 = buf0.slice(0, 8)
        var buf2 = buf0.slice(7, 15)
        this.questionchg(this.shuffleAry((buf0).slice(0, 8)))
        this.question2chg(this.shuffleAry((buf0).slice(7, 15)))

        console.log(buf1)
        console.log(buf2)
        console.log(this.question)
        console.log(this.question2)

        this.ngflgoff()
      }.bind(this), 600)
      this.quiz(700)
    },

    quiz (a) {
      setTimeout(function () {
        this.commentchg(this.comment_arr[this.random2])
        //  store.commit('aopen')
        this.aopen()
      }.bind(this), a)
    },

    doRandom (a) {
      //  空白300ms,文字表示500ms
      this.commentchg(a)
    },

    result () {
      if (this.src && this.src2) {
        if (this.src === this.src2) {
          this.okflgon()
          this.next()
        } else {
          this.ngflgon()
          this.NGnext()
        }
      } else {}
    }
  }//  methods
}//  export default

</script>
<style scoped>

img{
  border-style:none;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .3));
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
