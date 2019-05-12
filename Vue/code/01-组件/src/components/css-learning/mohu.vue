<template>
  <div id="wrap">
    <img :src="cat" class="cat" width="64px" height="64px">
    <div id="bg"/>
  </div>
</template>

<script>
import cat from '@/assets/cat.jpg'
export default {
  name: "Mohu",
  data() {
    return {
      cat: cat
    }
  }
}
</script>

<style scoped>
  #wrap{
    height: 100px;
    position: relative;
    background: rgba(0,0,0,0.5);
  }

  #bg{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url("../../assets/cat.jpg") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(8px);
  }

  .cat{
    margin: 18px 0 0 18px;
  }
</style>
