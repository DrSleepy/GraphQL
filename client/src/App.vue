<template>
  <div class="root">
    <div class="wrapper">
      <keep-alive>
        <router-view></router-view>
        <!-- <app-login-view></app-login-view> -->
      </keep-alive>
    </div>
  </div>
</template>

<style lang="less">
@import './less/base.less';
</style>

<style lang="less" scoped>
@import (reference) './less/index.less';
.root {
  .grid-24;
  height: 100%;
  font-family: 'main-font-normal';
}
.wrapper {
  .container;
}
</style>

<script>
export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>
