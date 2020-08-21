<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
  import Home from './components/pages/Home.vue';

  export default {
    name: 'App',
    components: { Home }
  }
</script>

<style lang="scss">
  @import './assets/styles/main.scss';
</style>
