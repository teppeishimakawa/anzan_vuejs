//  親子関係にするには親のtemplateに子compいれる
var mixin = {
  methods: {
    endChkCustom: function endChkCustom () {
      //  q:複数要素を一括制御するパターン
      document.getElementById('enter').style.pointerEvents = 'none'
      document.getElementById('order_issue').style.display = 'none'
      document.getElementById('order_comment').style.display = 'none'
      //  document.getElementById("ans").style.display="none";
    }
  }
}

export default mixin
