<template>
  <div>
    <div style="display: none;">
     <img :src="require('../assets/btn.png')">
    </div>

    <div>
    <v-app-bar dense dark color="blue-grey lighten-1" class='font-weight-bold'>
       <v-toolbar-title>3秒間隔でタップ！</v-toolbar-title>
       <v-spacer></v-spacer>
       <my-progress></my-progress>
       <my-counter></my-counter>
    </v-app-bar>
    </div>
  <br>
    <v-main>
      <v-container>
        <my-btn></my-btn>
        <my-param></my-param>
      </v-container>
    </v-main>

<!--v-container無くしたら余計な上下マージン無くなった-->
    <v-footer absolute dense>
        <v-row dense>
          <v-col cols="9">
            <my-stt></my-stt>
          </v-col>
          <v-col cols="3">
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
import myStt from '@/components/my_stt.vue'

import myBtn from '@/components/my_btn.vue'
import myParam from '@/components/my_param.vue'

export default {
  name: 'Home',
  components: {
    //  html要素名:コンポーネント名の書き方でもok
    myProgress,
    myCounter,
    myStt,
    myScore,
    myBtn,
    myParam
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

.textblue
{
color:blue
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
    -webkit-filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.greenSudden {
    filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
    -webkit-filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

.blueSudden {
   filter: invert(8%) sepia(99%) saturate(7044%) hue-rotate(247deg) brightness(100%) contrast(145%);
   -webkit-filter: invert(8%) sepia(99%) saturate(7044%) hue-rotate(247deg) brightness(100%) contrast(145%);
}

</style>
