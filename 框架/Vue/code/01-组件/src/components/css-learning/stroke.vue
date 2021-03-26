<template>
  <h1 class="mystroke">{{ message }}</h1>
</template>

<script>
export default {
  name: "Stroke",
  data() {
    return {
      message: '祝存龙'
    }
  }
}
</script>

<style scoped>
.mystroke{
  font: 100px/200px "微软雅黑";
  text-align: center;
  color: white;
  -webkit-text-stroke: 4px pink;
}
</style>
