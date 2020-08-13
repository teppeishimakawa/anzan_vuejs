<template>
  <div>
<!--sw,link relでのprefetchがうまくいかなかったため以下の処理でprefetch-->
    <div style="display: none;">
     <img :src="require('../assets/ashiato.png')">
     <img :src="require('../assets/born.png')">
     <img :src="require('../assets/bow.png')">
     <img :src="require('../assets/bug.png')">
     <img :src="require('../assets/cat.png')">
     <img :src="require('../assets/chou.png')">
     <img :src="require('../assets/dog.png')">
     <img :src="require('../assets/dolphin2.png')">
     <img :src="require('../assets/dolphin.png')">
     <img :src="require('../assets/fish.png')">
     <img :src="require('../assets/fish2.png')">
     <img :src="require('../assets/fish3.png')">
     <img :src="require('../assets/fish4.png')">
     <img :src="require('../assets/frog.png')">
     <img :src="require('../assets/gachou.png')">
     <img :src="require('../assets/heart.png')">
     <img :src="require('../assets/horse.png')">
     <img :src="require('../assets/house.png')">
     <img :src="require('../assets/kame.png')">
     <img :src="require('../assets/maru.png')">
     <img :src="require('../assets/medic.png')">
     <img :src="require('../assets/panda.png')">
     <img :src="require('../assets/pen.png')">
     <img :src="require('../assets/sai.png')">
     <img :src="require('../assets/tanba.png')">
     <img :src="require('../assets/tori.png')">
     <img :src="require('../assets/tori2.png')">
     <img :src="require('../assets/tori3.png')">
     <img :src="require('../assets/uma.png')">
     <img :src="require('../assets/zebla.png')">
     <img :src="require('../assets/zou.png')">
    </div>

    <div>
    <v-app-bar dense dark color="blue-grey lighten-1" class='font-weight-bold'>
       <v-toolbar-title>同じマークを3回見つけて！</v-toolbar-title>
       <my-progress></my-progress>
       <my-counter></my-counter>
    </v-app-bar>
    </div>

    <v-main>
      <v-container>
        <my-qa></my-qa>
      </v-container>
    </v-main>

<!--v-container無くしたら余計な上下マージン無くなった-->
    <v-footer absolute dense>
        <v-row dense>
          <v-col cols="11">
            <my-stt></my-stt>
          </v-col>
          <v-col cols="1">
            <my-score></my-score>
          </v-col>
        </v-row>
    </v-footer>
    </div>
</template>
<script>
// @ is an alias to /src
import myProgress from '@/components/my_progress.vue'
import myCounter from '@/components/my_counter.vue'
import myScore from '@/components/my_score.vue'
import myQa from '@/components/my_qa.vue'
import myStt from '@/components/my_stt.vue'

export default {
  name: 'Home',
  components: {
    //  html要素名:コンポーネント名の書き方でもok
    myProgress,
    myCounter,
    myQa,
    myStt,
    myScore
  }
}

</script>
<style>
/*
.canlook
{
visibility: visible;
}

.canpoint
{
pointer-events: auto;
}
*/
.notlook
{
visibility: hidden;
}

.notpoint
{
pointer-events: none;
}

.textred
{
color:#ff6347
}

.textgreen
{
color:green
}

.textblack
{
color:black
}

.textwhite
{
color:white
}

.redBe
{
transition: filter 0s;
}

.greenBe
{
transition: filter 0s;
}

.redBe:active  {
  filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
    -webkit-filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.greenBe:active  {
  filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
    -webkit-filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

.redSudden {
    filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.greenSudden {
    filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

</style>
