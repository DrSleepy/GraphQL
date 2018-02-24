<template>
  <div class="login-view">

    <header class="view-header">
      <h1 class="header__item header__item--title"> Chabu </h1>
      <p class="header__item header__item--slogan"> Converse with strangers </p>
    </header>

    <app-login-form class="login-form-component"></app-login-form>

  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import (reference) '../less/index.less';

.login-view {
  .grid-24;
  grid-template-rows: 1fr 3fr;
  height: 100%;
}

.view-header {
  display: grid;
  grid-column: 1 / span 24;
  justify-items: center;
  align-content: center;
}

.header__item {
  &--title {
    font-family: 'main-font-normal';
    text-transform: uppercase;
  }
  &--slogan {
    .milli;
  }
}

.login-form-component {
  grid-column: 1 / span 24;
}
</style>
