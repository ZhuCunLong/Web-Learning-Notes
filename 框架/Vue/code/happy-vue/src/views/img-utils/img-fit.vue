<template>
  <div>
    <button @click="handleToggle">切换图片</button>
    <div class="img-wrapper img-wrapper-width">
      <img :src="imgWidth" v-img-fit @load="handleLoad">
    </div>
<!--    <div class="img-wrapper img-wrapper-height">
      <img :src="imgHeight" v-img-fit>
    </div>-->
  </div>
</template>

<script>
import imgWidth from '@/assets/imgWidth.png'
import imgHeight from '@/assets/imgHeight1.png'
export default {
  name: 'imgFit',
  data () {
    return {
      imgWidth,
      imgHeight,
      flag: true
    }
  },
  methods: {
    handleToggle () {
      this.imgWidth = this.flag ? imgHeight : imgWidth
      this.flag = !this.flag
    },
    handleLoad () {
      console.log('img load')
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .app-main{
  overflow: scroll;
}
.img-wrapper{
  background-color: #3A71A8;
  overflow: hidden;
  text-align:center;
  &+.img-wrapper{
    margin-top: 10px;
  }
  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  img{
    vertical-align: middle;
  }
}
.img-wrapper-width{
    width: 500px;
    height: 250px;
}
.img-wrapper-height {
  width: 250px;
  height: 500px;
}
</style>
