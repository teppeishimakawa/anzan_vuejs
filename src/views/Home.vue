<template>
  <div>
    <div id="title">フラッシュ暗算 5回正解して！</div>
      <my-progress></my-progress>
      <my-counter></my-counter>
    <br>
    <br>
    <br>
    <br>
    <br>
     <my-qa></my-qa>
     <my-score></my-score>
  </div>
</template>
<script>
// @ is an alias to /src
import myProgress from '@/components/my_progress.vue'
import myCounter from '@/components/my_counter.vue'
import myScore from '@/components/my_score.vue'
import myQa from '@/components/my_qa.vue'

export default {
  name: 'Home',
  components: {
    //  html要素名:コンポーネント名の書き方もok
    myProgress,
    myCounter,
    myQa,
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
}

.green:active {
    filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

.textred
{
color:#ff6347
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
