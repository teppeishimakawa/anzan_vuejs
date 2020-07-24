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

</style>
