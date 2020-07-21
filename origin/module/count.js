//countとプログレスバー


var PassSec;
var PassageID;
var sec=30;
var num=5;




import {cnt,intervalID,val} from "../index.js"
import {endChkCustom,setVal} from "../index.js"



//count
　　　　　function showPassage()
　　　　　{
         var msg;
   　　　 PassSec++;
   　　　 //msg = 29 - (Math.floor(PassSec/100)) + ":" +  ( '00' + (100 - PassSec%100)).slice( -2 );   // 表示文作成
         msg = (Math.floor(PassSec/100)) + ":" +  ( '00' + (PassSec%100)).slice( -2 );
         document.getElementById("time").innerHTML = msg;
         endChk();
　　　　　}

　export function startShowing()
　　　　　{
   　　　　PassSec = 0;
   　　　　PassageID = setInterval(showPassage,10);
　　　　　}

  export function stopShowing()
        {
         clearInterval(PassageID);
        }



//終了処理
function endChk()
{
 if( (PassSec/100) >= sec || cnt == num)
  {
   endChkBase();
   endChkCustom();
  }
}


 function endChkBase()
 {
   stopShowing();
   //document.getElementById("time").innerHTML="0:00";
   document.getElementById("score").style.color="red";
   clearInterval(intervalID);
 }





//プログレスバー
 export function updateProgress()
  {
    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    setVal(val + 1)
    //val += 1;
    document.getElementById("myProgress").value = val;
    document.getElementById("myProgress").innerText = val + "%";
    //console.log("progress:", val, "%");

    // 最大値まで達したら終了
    if (val == 100)
    {
      clearInterval(intervalID);
    }
  }


