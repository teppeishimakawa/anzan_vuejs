<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
    </p>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import store from '../store'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
  //  関数はそのhtmlmがあるファイルに記述
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    }
  }
}

</script>
