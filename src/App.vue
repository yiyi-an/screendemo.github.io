<template>
  <div id="app">
    <example/>
  </div>
</template>
<script>
import Example from './views/Example.vue'
export default {
  components:{
    Example
  }
}
</script>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
html{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
