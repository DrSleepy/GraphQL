<template>
  <div class="root">
    <div class="wrapper">
      <app-menu-view id="menu"></app-menu-view>
      <keep-alive>
        <router-view></router-view>
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
  position: relative;
  .grid-24;
  height: 100%;
  font-family: 'main-font-normal';
  user-select: none;
  color: white;
  background-color: @background-color1;
}
.wrapper {
  .container;
}
//
//
//
//
//

#menu {
  .pad-4;
  background-color: blue;
  position: absolute;
  transition: 100ms linear;
  transform: translateX(-100%);
}
</style>

<script>
/* eslint-disable */
window.onload = () => {
  const menuUi = document.querySelector('#menu');
  let menuOpen = false;

  let allowMenuAccess = false;
  let startPos;
  let endPos;
  const needsToBeSlided = window.innerWidth / 3;

  const dragStart = e => {
    startPos = e.clientX;

    const menuAccessArea = window.innerWidth / 8;
    if (startPos < menuAccessArea) {
      allowMenuAccess = true;
    } else {
      allowMenuAccess = false;
    }
  };

  const dragEnd = e => {
    endPos = e.clientX;
    if (!allowMenuAccess) {
      return;
    }
    if (endPos - startPos > needsToBeSlided) {
      menuUi.style.transform = 'translateX(0%)';
      menuOpen = true;
    }
    if (endPos - startPos < needsToBeSlided) {
      menuUi.style.transform = 'translateX(-100%)';
      menuOpen = false;
    }
  };

  window.addEventListener('mousedown', dragStart);
  window.addEventListener('mouseup', dragEnd);
};

export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>
