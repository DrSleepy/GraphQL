<template>
  <form class="form">

    <input class="x" value="x">

  </form>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import (reference) '../less/index.less';

.form {
  .grid-24;
  grid-template-rows: repeat(24, 1fr);
}
.x {
  grid-column: 4 / span 18;
}

@media @laptop {
  .x {
    grid-column: 6 / span 12;
  }
}
</style>
