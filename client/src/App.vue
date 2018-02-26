<template>
  <div id="root" class="root">
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
import Hammer from 'hammerjs';

window.onload = () => {
  const menuAccessArea = window.innerWidth / 8;

  const menuUi = document.querySelector('#menu');
  const root = document.querySelector('#root');
  const gestures = new Hammer(root);

  let startPos;

  gestures.on('panstart panright', e => {
    if (e.type === 'panstart') {
      startPos = event.clientX;
    }

    if (startPos < menuAccessArea) {
      const rounded = Math.round(e.distance);
      console.log(rounded);
      if (rounded < 99) {
        menuUi.style.transform = `translateX(${-100 + rounded}%)`;
      }
      if (rounded > 99) {
        menuUi.style.transform = 'translateX(0%)';
      }
    }
  });
};

export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>
