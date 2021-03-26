<template>
  <div>
    <input v-model="imgname">
    <button @click="handleSelect()">添加</button>
    <div>
      <img :src="imgpath" class="img">
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgTest",
  data(){
    return {
      imgname: '',
      imgpath: require("@/assets/cat.jpg")
    }
  },
  methods: {
    handleSelect() {
      // 中文路径无问题，jpg、png无问题
      this.imgpath = require(`@/assets/${this.imgname}.png`)
    }
  }
}
</script>

<style scoped>
.img{
  width: 100px;
  height: 100px;
  padding: 10px;
}
</style>
