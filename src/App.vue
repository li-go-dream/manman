<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app,section{
  height: 100%;
}
.resetcss .el-input__inner{
  background-color: #fff !important; 
  cursor: pointer !important;
}
</style>
