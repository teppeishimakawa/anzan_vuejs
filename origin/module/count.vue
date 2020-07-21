
<template>
<progress id="myProgress" value="0" max="100" v-bind:value="val">0%</progress>
<div id="time"></div>
</template>

<script>


module.exports
{
    data:function()
    {
        return {
            PassSec: "",
            PassageID: "",
            sec:30,
            num:5,
        }
    },

    methods:
    {

     showPassage:
     　　function showPassage()
　　　　　{
         var msg;
   　　　 PassSec++;
         msg = (Math.floor(PassSec/100)) + ":" +  ( '00' + (PassSec%100)).slice( -2 );
         document.getElementById("time").innerHTML = msg;
         endChk();
　　　　　},

     endChk:
       function endChk()
       {
        if( (PassSec/100) >= sec || cnt == num)
        {
         endChkBase();
         endChkCustom();
        }
       },

     endChkBase:
     function endChkBase()
     {
      stopShowing();
      //document.getElementById("time").innerHTML="0:00";
      document.getElementById("score").style.color="red";
      clearInterval(intervalID);
     },
//method
    }
}





//プログレスバー
 export function updateProgress()
  {
    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    setVal(val + 1)
    //val += 1;
    //document.getElementById("myProgress").value = val;
    //document.getElementById("myProgress").innerText = val + "%";
    //console.log("progress:", val, "%");

    // 最大値まで達したら終了
    if (val == 100)
    {
      clearInterval(intervalID);
    }
  }


</script>




<style scoped>

#time
{
position: fixed;top: 15%; right:5%;  width:200px;height:70px;text-align:right;font-size: 15px;color: black;
}

#myProgress
{
position: fixed;top: 13.2%; right:4%;  width:100px;height:40px;text-align:right;
}

</style>