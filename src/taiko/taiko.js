var cnt=0;
var score=0;
var def=[];
var def_total=0;
var defdef;
var bpm,duration;
var nowTime=[];



(function() {
    'use strict';

    var isSP, ctx, xml, data;

    // コンテキストを生成
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();

    // 音源ファイルをバイナリデータとして取得
    xml = new XMLHttpRequest();
    xml.responseType = 'arraybuffer';
    xml.open('GET', './pon.mp3', true);
    xml.onload = function()
    {
        // 音源ファイルをバイナリデータからデコード
        ctx.decodeAudioData(
            xml.response,
            function(dec_data) {
                data = dec_data;
            },
            function(e) {
                alert(e.err);
            }
        );
    };
    xml.send();

    isSP = typeof window.ontouchstart !== 'undefined';

        document.getElementById("btn").addEventListener(isSP ? 'touchstart' : 'click', function()
        {

            if(isNaN(bpm) || isNaN(duration)){alert("please enter bpm and duration!!")}

            var bufferSource;
            bufferSource = ctx.createBufferSource();
            bufferSource.buffer = data;
            bufferSource.connect(ctx.destination);
            bufferSource.start(0);

            try{navigator.vibrate(5000)}catch(e){}

            //  ボタンpushのたびにその時の時刻を配列に格納
            nowTime.push(new Date().getTime())
            if(cnt > 0){
            //  タップの間隔を配列に格納
            def.push(nowTime[cnt] - nowTime[cnt - 1])
           }

             if(cnt < 2)
                {
                 defdef=0
                }else
                {
                defdef=Math.min
                 (
                //defdefは１つ前のdefとの差、それぞれの倍数の余りを比較し、最小値を採用。cnt > 1からdefdef取れる
                  Math.abs(def[cnt-1] - def[cnt - 2]),
                  Math.abs(def[cnt-1] % def[cnt - 2]),Math.abs(def[cnt - 2] % def[cnt-1])
                 );
                }
                //  console.log(Math.abs(def[cnt-2] - def[cnt - 3]));
                //  console.log(Math.abs(def[cnt-2] % def[cnt - 3]));
                //  console.log(Math.abs(def[cnt - 3] % def[cnt-2]));

            if(cnt > 1){
             def_total = def_total + defdef;
            }

            console.log(defdef)
            console.log(def_total);
            //  console.log(bpm,duration)
            cnt++;
            console.log(def_total/cnt*0.5,Math.abs((cnt - bpm*duration/60)*5))
        });

document.getElementById("kekka").onclick=function()
{
score = Math.floor(100 - def_total/cnt*0.5 - Math.abs((cnt - bpm*duration/60)*5))
//採点：100 - 1click平均の間隔の差*調整値 - 総click数とbpm*分数の差*調整値
if(score < 0){
    score = 0 + "点!"
}else{
    score = Math.floor(100 - def_total/cnt*0.5 - Math.abs((cnt - bpm*duration/60)*5)) + "点!"
}
document.getElementById("disp").innerHTML= score
};

document.getElementById("set").onclick=function()
{
bpm=parseInt(document.getElementById("bpm").value);
duration=parseInt(document.getElementById("duration").value);

console.log(bpm);
console.log(duration);
}

window.onload=function()
{
bpm=parseInt(document.getElementById("bpm").value);
duration=parseInt(document.getElementById("duration").value);
}

document.getElementById("rld").onclick=function()
{
location.reload();
}

   })
();



