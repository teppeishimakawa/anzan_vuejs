<!--start,reloadボタン-->
<template>
    <span>
      <v-btn color='info' class='ma-1 px-6' :disabled="this.playflg" @click="play">start</v-btn>
      <v-btn color='info' class='ma-1' @click="reload">reload</v-btn>
    </span>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      playflg: false
    }
  },

  computed: {

    ...mapState(['bufferSource', 'ctx', 'bufdata'])
  },

  methods: {

    ...mapMutations(['setbuf', 'setctx', 'setdata']),

    //  ...mapMutations(['sttflgon']),
    play () {
      this.playflg = true
      // コンテキストを生成
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.setctx(new AudioContext())
      console.log(this.ctx)
      var comp = this
      // 音源ファイルをバイナリデータとして取得
      var xml = new XMLHttpRequest()
      xml.responseType = 'arraybuffer'
      xml.open('GET', require('../assets/pon.mp3'), true)
      xml.onload = function () {
        // 音源ファイルをバイナリデータからデコード
        comp.ctx.decodeAudioData(
          xml.response,
          function (decData) {
            comp.setdata(decData)
          },
          function (e) {
            alert(e.err)
          }
        )
      }
      xml.send()
    },
    reload () { location.reload() }
  }
}
</script>
<style scoped>

div {
width:500px;
display: inline;
}

</style>
