<template>
  <div id="test">
    test
  </div>
</template>

<script>
export default {
  name: "NewBox"
}
</script>

<style scoped>
#test{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  background: green;
  text-align: center;
  line-height: 100px;
  box-shadow: inset 10px 10px 10px black;
}
</style>
