<template>
  <div class="root">
    <div class="wrapper">
      <keep-alive>
        <!-- <router-view></router-view> -->
        <app-login-view></app-login-view>
      </keep-alive>
    </div>
  </div>
</template>

<style lang="less">
@import './less/base.less';
</style>

<style lang="less" scoped>
@import (reference) './less/index.less';
</style>

<script>
export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>
