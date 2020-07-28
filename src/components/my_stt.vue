<!--start,reloadボタン-->
<template>
    <div>
      <v-btn color='info' class='ma-1 px-6' :disabled="this.sttflg" @click="this.sttflgon">start</v-btn>
      <v-btn color='info' class='ma-1' @click="reload">reload</v-btn>
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

div {
width:250px;
position: fixed;
bottom: 1%;
left: 50%;
transform: translate(-50%, 0%);
}

</style>
