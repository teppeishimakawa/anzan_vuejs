<!--start,reloadボタン-->
<template>
    <span>
      <v-btn color='info' class='ma-1 px-6' :disabled="this.sttflg" @click="this.sttflgon">start</v-btn>
      <v-btn color='info' class='ma-1' @click="reload">reload</v-btn>
    </span>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {

  computed: {
    ...mapState(['sttflg'])
  },

  methods: {

    ...mapMutations(['sttflgon']),

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
