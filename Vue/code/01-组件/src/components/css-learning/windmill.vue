<template>
  <div id="wrap" class="main">
    <div class="leaf"></div>
    <div class="leaf"></div>
    <div class="leaf"></div>
    <div class="leaf"></div>
  </div>
</template>

<script>
export default {
  name: "Windmill"
}
</script>

<style scoped>
#wrap{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  height: 400px;
  //border: 1px solid black;
  transition: 1s;
}

#wrap:hover{
  transform: rotate(120deg);
}
.leaf{
  float: left;
  background: aqua;
  width: 180px;
  height: 180px;
  margin: 10px;
}

#wrap .leaf:nth-child(1),#wrap .leaf:nth-child(4){
  border-radius: 0 60%;
}

#wrap .leaf:nth-child(2),#wrap .leaf:nth-child(3){
   border-radius: 60% 0;
}
</style>
<style>

</style>
