<script setup lang="ts">

</script>
<template>
  <router-view />
</template>
<script setup lang="ts">
const debounce = (fn, delay) => {
  let timer
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
}
  const _ResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
      constructor(callback) {
        callback = debounce(callback, 200);
        super(callback);
      }
  }
</script>
<style>
#app {
  height: 100%;
}html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}


</style>