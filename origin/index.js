
//親子関係にするには親のtemplateに子compいれる
var endChkCustomComp = {
//不要でもtemplateで仮divなど入れないと親子関係のref使えない
  template:'<div></div>',

  methods: {
  endChkCustom:
   function endChkCustom()
    {
    //q:複数要素を一括制御するパターン
     document.getElementById("enter").style.pointerEvents="none"
     document.getElementById("order_issue").style.display="none";
     document.getElementById("order_comment").style.display="none";
   //document.getElementById("ans").style.display="none";
    }
  }
}



/*
//valとupdateProgress()をmixin
var progress_mixin = {
  data: function (){return {val:0,}},

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
*/





//component登録はインスタンス生成より先じゃないとNG
var counterComp =
{
    components: {
    //html要素名:コンポーネント名(htmlはケバブケース統一が無難)
    'end_chk_custom': endChkCustomComp,
  },

  data: function (){return {
    PassSec: '',
    PassageID: '',
    time: '',
    sec: 30,
    num: 5,
    }
  },
  //子のhtmlコンポーネントをnest
  template: '<div id="time"><end_chk_custom ref="custom"></end_chk_custom>{{time}}</div>',

  methods:
  {
   showPassage:
   function showPassage()
　　　{
      var msg;
   　　this.PassSec++;
   　　//msg = 29 - (Math.floor(PassSec/100)) + ":" +  ( '00' + (100 - PassSec%100)).slice( -2 );   // 表示文作成
      msg = (Math.floor(this.PassSec/100)) + ":" +  ( '00' + (this.PassSec%100)).slice( -2 );
       this.time = msg;
       this.endChk();
　　　},

   startShowing:
   function startShowing()
　　　　　{
   　　　　this.PassSec = 0;
   　　　　this.PassageID = setInterval(this.showPassage,10);
　　　　　},

  stopShowing:
  function stopShowing()
        {
         clearInterval(this.PassageID);
        },

  endChk:
     function endChk()
      {/////////親compの変数参照///////////////////////////
        if( (this.PassSec/100) >= this.sec || this.$root.cnt == this.num)
      ///////////////////////////////////////////////////
       {
        this.endChkBase();
        /////////他compの関数利用///////////////////////////
        //this.endChkCustom();
        this.$refs.custom.endChkCustom();
        ///////////////////////////////////////////////////
       }
      },

  endChkBase:
     function endChkBase()
      {
       this.stopShowing();
       //document.getElementById("time").innerHTML="0:00";
       document.getElementById("score").style.color="red";
       clearInterval(this.$root.intervalID);
      }
  }

};





















function isMobile()
{
  var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return (window.navigator.userAgent.search(regexp) !== -1);
}

//実行結果を変数に代入して使わないとNG
var mobile = isMobile();





function random(num)
{
 return Math.floor(Math.random()*num)
};







var app = new Vue({
  el: '#app',

  components: {
    'my_progress': httpVueLoader('./module/progress.vue'),
    //html要素名:コンポーネント名
    'counter': counterComp,


  },

  //mixins: [progress_mixin],

  data:
  {
    order_issue: '',
    order_comment:'',
    score:'',
    cnt: 0,
    num_arr1:[0,1,2,3,4,5,6,7,8,9],
    num_arr2:[0,1,2,3,4,5,6,7,8,9],
    comment_arr:["&nbsp;&nbsp;足して！","&nbsp;&nbsp;足して！","&nbsp;&nbsp;掛けて！"],
    kigou:["+","+","*"],
    random1:random(10),
    random1_2:random(10),
    random2:random(3),
    intervalID:'',
  },

//action起こした時は必ず結果返す必要あるのでcomputedでなくmethod
  methods:
  {
   edit:
   function edit(e)
  {
    this.order_issue = this.order_issue + e;
  if(this.order_issue == (  Math.abs(new Function("return " + this.num_arr1[this.random1] + this.kigou[this.random2] + this.num_arr2[this.random1_2])())  ))
    {
    document.getElementById("enter").className = 'green'
    }else{document.getElementById("enter").className = 'red';}
  },


   result:
   function result()
  {
  console.log(this.kigou[this.random2]);
   if(this.order_issue == (  Math.abs(new Function("return " + this.num_arr1[this.random1] + this.kigou[this.random2] + this.num_arr2[this.random1_2])())  ))
    {
      this.next();}else{this.NGnext()}
      //this.order_issue="";
  },


  click:
  function click()
{
  var flg=0;
  if(flg == 0)
    {//Vue.jsのmethodでsetInterval、setTimeoutを使う場合は、それぞれに「.bind(this)」をつける必要あり
      //////////////外部関数利用///////////
      this.$refs.counterComp.startShowing();
      ///////////////////////////////
      document.getElementById("stt").disabled=true;
      flg=1;
      document.getElementById("order_issue").style.visibility="visible";
      this.order_issue=this.num_arr1[this.random1];
      setTimeout(function(){this.order_issue="";}.bind(this),500)
      setTimeout(function(){this.order_issue=this.num_arr2[this.random1_2];}.bind(this),800)
      setTimeout(function(){this.order_issue="";}.bind(this),1300)
      setTimeout(function(){this.order_comment=this.comment_arr[this.random2];}.bind(this),1600)
      document.getElementById("enter").style.pointerEvents="auto"
    }else{}
        this.$refs.prog.val=0;
      // 300msおきにプログレスバーを更新する。30秒で100%
      this.intervalID=setInterval(this.$refs.prog.updateProgress, 300);
},


   next:
   function next()
{
   this.cnt++;
 console.log()
   this.score=this.cnt;
   this.random1=random(10);
   this.random1_2=random(10);
   this.random2=random(3);
   //空白300ms,文字表示500ms
   this.order_issue="ok!";
   this.order_comment="";
      setTimeout(function(){this.order_issue="";}.bind(this),300)
      setTimeout(function(){this.order_issue=this.num_arr1[this.random1];}.bind(this),600)
      setTimeout(function(){this.order_issue="";}.bind(this),1100)
      setTimeout(function(){this.order_issue=this.num_arr2[this.random1_2];}.bind(this),1400)
      setTimeout(function(){this.order_issue="";}.bind(this),1900)
      setTimeout(function(){this.order_comment=this.comment_arr[this.random2];}.bind(this),2200)
},


   NGnext:
   function NGnext()
{
   this.cnt--;
   this.score=this.cnt;
   this.random1=random(10);
   this.random1_2=random(10);
   this.random2=random(3);
   document.getElementById("order_issue").style.color="red"
   this.order_issue="NG...";
   this.order_comment="";
      setTimeout(function(){this.order_issue="";}.bind(this),300)
      setTimeout(function()
        {
         this.order_issue=this.num_arr1[this.random1];
         document.getElementById("order_issue").style.color="black";
        }.bind(this),600)
      setTimeout(function(){this.order_issue="";}.bind(this),1100)
      setTimeout(function(){this.order_issue=this.num_arr2[this.random1_2];}.bind(this),1400)
      setTimeout(function(){this.order_issue="";}.bind(this),1900)
      setTimeout(function(){this.order_comment=this.comment_arr[this.random2];}.bind(this),2200)
},

reload:
function(){location.reload()}


//methods
  },


 //methods:{ edit:function(e){this.order_issue=e}},

});


























/*
export var setIntervalID = (value) => {
  intervalID = value;
}

export var setCnt = (value) => {
  cnt = value;
}
*/




















