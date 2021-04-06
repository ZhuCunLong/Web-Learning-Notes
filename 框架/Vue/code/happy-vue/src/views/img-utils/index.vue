<template>
  <div>
    <img :src="imgSrc"/>
    <div>
      <h2>通过外层div控制</h2>
      <div class="img-control">
        <!--<img :src="imgSrc">-->
      </div>
    </div>
    <div>
      <img :src="handleSrc" height="100">
    </div>
  </div>
</template>

<script>
import logo from '@/assets/imgtest1.png'
import defaultImg from '@/assets/logo.png'
export default {
  name: 'ImgUtils',
  data () {
    return {
      imgSrc: logo,
      handleSrc: null,
      defaultImg
    }
  },
  async created () {
    /* this.handleImg({
      src: this.imgSrc,
      rect: {
        x: 0,
        y: 50,
        width: 50,
        height: 50
      }
    }).then(res => {
      this.canvasUrl = res
    }) */
    try {
      this.handleSrc = await this.handleImg({
        src: this.imgSrc,
        rect: {
          x: 0,
          y: 50,
          width: 50,
          height: 50
        }
      })
    } catch (err) {
      console.error(err)
      this.handleSrc = this.defaultImg
    }
  },
  methods: {
    handleImg (opts) {
      return new Promise((resolve, reject) => {
        const { src, rect } = opts
        if (!src || !rect) {
          reject(new Error('opts params Error!'))
        }
        const img = new Image()
        img.src = src
        // const canvas1 = document.getElementById('c1')
        img.onload = function () {
          const canvas1 = document.createElement('canvas')
          const ctx1 = canvas1.getContext('2d')
          // 图片原来的宽高
          const { width, height } = this
          canvas1.width = width
          canvas1.height = height
          ctx1.drawImage(this, 0, 0, width, height)
          const { x, y, width: _width, height: _height } = rect
          const imageData = ctx1.getImageData(x, y, _width, _height)
          const canvas2 = document.createElement('canvas')
          canvas2.width = 50
          canvas2.height = 50
          const ctx2 = canvas2.getContext('2d')
          ctx2.putImageData(imageData, 0, 0)
          const img2 = canvas2.toDataURL('image/png')
          resolve(img2)
        }
        img.onerror = function (err) {
          reject(err)
        }
      })
    },
    handleImg2 (opts) {
      return new Promise((resolve, reject) => {
        const { src, rect } = opts
        if (!src || !rect) {
          reject(new Error('opts params Error!'))
        }
        const img = new Image()
        img.src = src
        img.onload = function () {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const { x, y, width, height } = rect
          canvas.width = width
          canvas.height = height
          ctx.drawImage(this, x, y, width, height, 0, 0, width, height)
          const url = canvas.toDataURL('image/png')
          resolve(url)
        }
        img.onerror = function (err) {
          reject(err)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.img-control{
  width: 50px;
  height: 50px;
  img{
  }
}
</style>
