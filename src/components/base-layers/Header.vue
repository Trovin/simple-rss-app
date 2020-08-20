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
  name: 'Header'
}
</script>

<style lang="scss">
  @import '../../assets/styles/variables.scss';

  .header {
    padding: 20px;
    text-align: center;
    color: #fff;
    background-color: $theme-color;
  }

  .header-headline {
    margin-bottom: 20px;
    font-size: 48px;
  }

  .header-subtitle {
    font-size: 14px;
  }
</style>
