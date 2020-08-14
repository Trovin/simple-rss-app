<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
  import home from './components/pages/home/index.vue'

  export default {
    name: 'rss-app',
    components: { home }
  }
</script>

<style lang="scss">
  @import './assets/styles/main.scss';
</style>
