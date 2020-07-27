<!--start,reloadボタン-->
<template>
    <div>
      <button class='green' :disabled="this.sttflg" @click="this.sttflgon">start</button>
      <button class='green' @click="reload">reload</button>
    </div>
</template>

<script>
//  import store from '../store'
// this.$store.stateを略して呼べるようにするため
import { mapState, mapMutations } from 'vuex'

export default {

  computed: {
    ...mapState(['sttflg'])
  },

  methods: {
  // this.$store.commit('xxxx')`をthis.xxx()`で呼べるようにする
    ...mapMutations(['sttflgon']),

    reload () { location.reload() }
  }

}

</script>
<style scoped>
button {
    display: inline-block;
    color: #fff;
    background-color: #42b983;
    border-color: #2e6da4;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    width:80px;
    margin:10px;
}

button[disabled] {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: .65;
}

div {
width:250px;
position: fixed;
bottom: 1%;
left: 50%;
transform: translate(-50%, 0%);
}

</style>
