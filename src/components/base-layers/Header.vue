<template>
  <header class="header">
    <h1 class="header-headline">Your rss feeds</h1>
    <p class="header-subtitle">
      <span class="hide-xs">Subscribe to news with rss </span>
      <a href="https://edition.cnn.com/audio" class="header-link" target="_blank">some of feed you can see here</a>
    </p>
  </header>
</template>

<script>
export default { name: 'Header' }
</script>

<style lang="scss">
  @import '../../assets/styles/variables.scss';

  .header {
    padding: 20px;
    text-align: center;
    color: $white-color;
    background-color: $theme-color;
  }

  .header-headline {
    font-size: 42px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .header-subtitle {
    font-size: 14px;
  }

  .header-link {
    padding-bottom: 5px;
    text-decoration: none;
    border-bottom: 1px solid $white-color;
  }
</style>
