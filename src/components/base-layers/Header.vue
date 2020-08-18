<template>
  <header class="header">
    <h1 class="header-headline">Your rss feeds</h1>
    <p class="header-subtitle">
      Subscribe to news with rss
      (<a href="https://edition.cnn.com/audio" target="_blank">some of feed you can see here</a>)
    </p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
  .header {
    padding: 20px;
    text-align: center;
    color: #fff;
    background-color: #ff7546;
  }

  .header-headline {
    margin-bottom: 20px;
    font-size: 48px;
  }

  .header-subtitle {
    font-size: 14px;
  }
</style>
