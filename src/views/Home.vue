<template>
  <div>
    <div>後出しジャンケン 10勝して！</div>
      <my-progress></my-progress>
      <my-counter></my-counter>
      <my-qa></my-qa>
      <my-stt></my-stt>
      <my-score></my-score>
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

.red
{
transition: filter 0s;
}

.green
{
transition: filter 0s;
}

.red:active {
  filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
    -webkit-filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.green:active {
  filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
    -webkit-filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

.redSudden{
    filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
        -webkit-filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.greenSudden{
    filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
    -webkit-filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

.textred
{
color:#ff6347
}

.textgreen
{
color:#2e8b57
}

.textblack
{
color:black
}

.textwhite
{
color:white
}
</style>
