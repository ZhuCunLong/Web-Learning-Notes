<template>
  <div id="wrap">
    <div id="test"></div>
    <div id="fixed"></div>
  </div>
</template>

<script>
export default {
  name: "MyFixed",
  methods:{
           hellow(){
        console.log('heelo');
      }
  }
}
</script>

<style scoped>
#wrap{
  height: 100%;
  border: 1px solid red;
  overflow: auto;
}
#test{
  height: 3000px;
}
#fixed{
  position: absolute;
  width: 200px;
  height: 200px;
  left: 20px;
  top: 20px;
  background: aqua;
}
</style>
