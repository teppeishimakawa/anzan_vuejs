
<!--//valとupdateProgress()はrefで値渡し。updateProgress()をsetIntervalで使用-->

<template>
<progress value="0" max="100" v-bind:value="val"></progress>
</template>




<script>

module.exports=
{

  data: function (){return {val:0}},

  methods:
  {
   updateProgress()
   {
    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    this.val++;
    //document.getElementById("myProgress").value = this.val;
    //document.getElementById("myProgress").innerText = this.val + "%";
    if (this.val == 100)
    {clearInterval(this.intervalID);}
   },
  }
}

</script>





<style scoped>

progress
{
position: fixed;top: 13.2%; right:4%;  width:100px;height:40px;text-align:right;
}

</style>