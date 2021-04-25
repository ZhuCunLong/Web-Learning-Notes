<template>
  <div class="canvas-draw-panel">
    <canvas
      :id="domId"
      :class="{'canvas': canDraw}"
      :width="width"
      :height="height"
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)"
      @contextmenu.prevent>
    </canvas>
  </div>
</template>
<script>
export default {
  name: 'CanvasDrawPanel',
  props: {
    // 是否可以绘制
    canDraw: {
      type: Boolean,
      default: true
    },
    // canvas相对定位的元素的id
    positionElId: {
      type: String
    },
    info: { // 位置点信息
      type: Array
    },
    width: { // 绘图区域宽度
      type: Number
    },
    height: { // 绘图区域高度
      type: Number
    },
    lineColor: { // 画笔颜色
      type: String,
      default: '#FFD100'
    },
    lineWidth: { // 画笔宽度
      type: Number,
      default: 4
    },
    lineType: { // 画笔类型
      type: String,
      default: 'polygon'
    },
    cross: { // 画线时，线的那一侧是A
      type: String,
      default: 'left'
    },
    AtoB: { // 画线时，跨度是从A到B,还是从B到A
      type: String,
      default: 'AtoB'
    },
    domId: { // 同一页面多次渲染时，用于区分元素的id
      type: String,
      default: '123'
    }
  },
  watch: {
    info (val) {
      if (val) {
        this.initDraw()
      }
    }
  },
  data () {
    return {
      // canvas对象
      context: {},
      // 是否处于绘制状态
      canvasMoveUse: false,
      // 绘图的起点
      startPoint: {},
      // 绘制矩形和椭圆时用来保存起始点信息
      beginRec: {
        x: '',
        y: '',
        imageData: ''
      },
      // 储存坐标信息
      drawInfo: [],
      // 储存坐标副本信息
      cachedDrawInfo: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initDraw()
    })
  },
  methods: {
    // 初始化绘制信息
    initDraw () {
      // 初始化画布
      const canvas = document.getElementById(this.domId)
      this.context = canvas.getContext('2d')
      this.context.fillStyle = 'rgba(255, 255, 255, 0)'
      this.clean()
      // 初始化画笔
      this.context.lineWidth = this.lineWidth
      this.context.strokeStyle = this.lineColor
      // 如果info初始存在，绘制初始内容
      if (this.info && this.info.length !== 0) {
        this.drawWithInfo()
      }
    },
    // 鼠标按下
    canvasDown (e) {
      if (e.button === 2) {
        return
      }
      const canvasX = e.offsetX
      const canvasY = e.offsetY
      if (this.canDraw) {
        if (this.lineType === 'line' || this.lineType === 'rec') {
          if (this.drawInfo[0] && (this.drawInfo[0].w || this.drawInfo[0].h || this.drawInfo[0].a || this.drawInfo[0].b)) {
            if (this.lineType === 'line') {
              this.drawChar(this.cross, this.AtoB, this.drawInfo[0])
            }
            this.canvasMoveUse = false
            this.$emit('drawFinished', this.drawInfo)
            return
          }
        }
        if (this.canvasMoveUse === false) {
          this.context.clearRect(0, 0, this.width, this.height)
          this.clearDrawInfo()
          this.canvasMoveUse = true
          this.startPoint = {
            x: canvasX / this.width,
            y: canvasY / this.height
          }
        }
        // 记录起始点和起始状态
        this.beginRec.x = canvasX
        this.beginRec.y = canvasY
        this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height)
        // 存储本次绘制坐标信息
        this.drawInfo.push({
          x: canvasX / this.width,
          y: canvasY / this.height,
          type: this.lineType
        })
      }
    },
    Area (p0, p1, p2) {
      let area = 0.0
      area = p0.x * p1.y + p1.x * p2.y + p2.x * p0.y - p1.x * p0.y - p2.x * p1.y - p0.x * p2.y
      return area / 2
    },
    // 计算多边形质心
    getPolygonAreaCenter (points) {
      let sumX = 0
      let sumY = 0
      let sumArea = 0
      let p1 = points[1]
      for (var i = 2; i < points.length; i++) {
        const p2 = points[i]
        const area = this.Area(points[0], p1, p2)
        sumArea += area
        sumX += (points[0].x + p1.x + p2.x) * area
        sumY += (points[0].y + p1.y + p2.y) * area
        p1 = p2
      }
      return {
        x: sumX / sumArea / 3,
        y: sumY / sumArea / 3
      }
    },
    // 根据坐标信息绘制图形
    drawWithInfo () {
      this.info.forEach(item => {
        this.context.beginPath()
        if (item.type === 'rec') {
          this.context.rect(item.x * this.width, item.y * this.height, item.w * this.width, item.h * this.height)
        } else if (item.type === 'circle') {
          this.drawEllipse(this.context, (item.x + item.a) * this.width, (item.y + item.b) * this.height, item.a > 0 ? item.a * this.width : -item.a * this.width, item.b > 0 ? item.b * this.height : -item.b * this.height)
        } else if (item.type === 'line') {
          this.context.moveTo(item.x * this.width, item.y * this.height)
          this.context.lineTo(item.a * this.width, item.b * this.height)
          this.context.stroke()
          this.drawChar(this.cross, item.AtoB, item)
        } else if (item.type === 'arrow') {
          this.drawArrow(this.context, item.x * this.width, item.y * this.height, item.a * this.width, item.b * this.height)
        } else if (item.type === 'two-way-arrow') {
          this.drawArrow(this.context, item.x * this.width, item.y * this.height, item.a * this.width, item.b * this.height, true)
        } else if (item.type === 'polygon') {
          this.drawPolygon(this.context, item.region)
        } else {
          // 若果传进来的type为空，那代表是默认状态，也就是全屏框
          this.context.rect(0.02 * this.width, 0.02 * this.height, 0.96 * this.width, 0.96 * this.height)
        }
        this.context.stroke()
      })
    },
    // 鼠标移动时绘制
    canvasMove (e) {
      if (this.canvasMoveUse && this.canDraw) {
        // client是基于整个页面的坐标，offset是cavas距离pictureDetail顶部以及左边的距离
        let canvasX = 0
        let canvasY = 0
        canvasX = e.offsetX
        canvasY = e.offsetY
        if (this.lineType === 'rec') { // 绘制矩形时恢复起始点状态再重新绘制
          this.context.putImageData(this.beginRec.imageData, 0, 0)
          this.context.beginPath()
          this.context.rect(this.beginRec.x, this.beginRec.y, canvasX - this.beginRec.x, canvasY - this.beginRec.y)
          const info = this.drawInfo[this.drawInfo.length - 1]
          info.w = canvasX / this.width - info.x
          info.h = canvasY / this.height - info.y
        } else if (this.lineType === 'circle') { // 绘制椭圆时恢复起始点状态再重新绘制
          this.context.putImageData(this.beginRec.imageData, 0, 0)
          this.context.beginPath()
          const a = (canvasX - this.beginRec.x) / 2
          const b = (canvasY - this.beginRec.y) / 2
          this.drawEllipse(this.context, this.beginRec.x + a, this.beginRec.y + b, a > 0 ? a : -a, b > 0 ? b : -b)
          const info = this.drawInfo[this.drawInfo.length - 1]
          info.a = a / this.width
          info.b = b / this.height
        } else if (this.lineType === 'line') {
          this.context.putImageData(this.beginRec.imageData, 0, 0)
          this.context.beginPath()
          this.context.moveTo(this.beginRec.x, this.beginRec.y)
          this.context.lineTo(canvasX, canvasY)
          const info = this.drawInfo[0]
          info.a = canvasX / this.width
          info.b = canvasY / this.height
        } else if (this.lineType === 'polygon') {
          this.context.putImageData(this.beginRec.imageData, 0, 0)
          this.context.beginPath()
          this.context.moveTo(this.beginRec.x, this.beginRec.y)
          this.context.lineTo(canvasX, canvasY)
          // let info = this.drawInfo[this.drawInfo.length - 1]
          // info.a = canvasX / this.width
          // info.b = canvasY / this.height
        } else if (this.lineType === 'arrow' || this.lineType === 'two-way-arrow') { // 绘制箭头时恢复起始点状态再重新绘制
          this.context.putImageData(this.beginRec.imageData, 0, 0)
          if (this.lineType === 'two-way-arrow') {
            this.drawArrow(this.context, this.beginRec.x, this.beginRec.y, canvasX, canvasY, true)
          } else if (this.lineType === 'arrow') {
            this.drawArrow(this.context, this.beginRec.x, this.beginRec.y, canvasX, canvasY)
          }
          const info = this.drawInfo[this.drawInfo.length - 1]
          info.a = canvasX / this.width
          info.b = canvasY / this.height
        }
        this.context.stroke()
      }
    },
    // 绘制椭圆
    drawEllipse (context, x, y, a, b) {
      context.save()
      var r = (a > b) ? a : b
      var ratioX = a / r
      var ratioY = b / r
      context.scale(ratioX, ratioY)
      context.beginPath()
      context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false)
      context.closePath()
      context.restore()
    },
    // 绘制箭头, twoWay代表是否双向
    drawArrow (ctx, fromX, fromY, toX, toY, twoWay, widthO, colorO, thetaO, headlenO) {
      const theta = typeof (thetaO) !== 'undefined' ? thetaO : 30
      const headlen = typeof (thetaO) !== 'undefined' ? headlenO : 10
      const width = typeof (widthO) !== 'undefined' ? widthO : 1
      const color = typeof (colorO) !== 'undefined' ? colorO : 'red'

      const angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI
      const angle1 = (angle + theta) * Math.PI / 180
      const angle2 = (angle - theta) * Math.PI / 180
      const topX = headlen * Math.cos(angle1)
      const topY = headlen * Math.sin(angle1)
      const botX = headlen * Math.cos(angle2)
      const botY = headlen * Math.sin(angle2)

      // ctx.save()
      ctx.beginPath()

      let arrowX = fromX - topX
      let arrowY = fromY - topY

      ctx.moveTo(arrowX, arrowY)
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      arrowX = toX + topX
      arrowY = toY + topY
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(toX, toY)
      arrowX = toX + botX
      arrowY = toY + botY
      ctx.lineTo(arrowX, arrowY)
      // Reverse length on the other side
      if (twoWay) {
        arrowX = fromX - topX
        arrowY = fromY - topY
        ctx.moveTo(arrowX, arrowY)
        ctx.lineTo(fromX, fromY)
        arrowX = fromX - botX
        arrowY = fromY - botY
        ctx.lineTo(arrowX, arrowY)
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
      }
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.stroke()
      ctx.restore()
    },
    // 绘制多边形
    drawPolygon (context, region) {
      region.forEach((point, index) => {
        context.lineTo(point.x * this.width, point.y * this.height)
        // 最后一个坐标要和起点坐标相连
        if (index === region.length - 1) {
          context.lineTo(region[0].x * this.width, region[0].y * this.height)
        }
      })
    },
    // 文字
    drawChar (cross, AtoB, position) {
      if (cross) {
        // 设置字体
        // this.context.font = this.$t('aimms.fontType_name')
        // 设置颜色
        this.context.fillStyle = '#FFD100'
        // 设置水平对齐方式
        this.context.textAlign = 'center'
        // 设置垂直对齐方式
        this.context.textBaseline = 'middle'
        let ratio = (position.x - position.a) / (position.y - position.b)
        if (ratio > 2) {
          ratio = 1
        } else if (ratio < -2) {
          ratio = -1
        }
        const Xa = ((position.x + position.a) / 2 - 0.05) * this.width
        const Ya = ((position.y + position.b) / 2 + ratio * 0.05) * this.height
        const Xb = ((position.x + position.a) / 2 + 0.05) * this.width
        const Yb = ((position.y + position.b) / 2 - ratio * 0.05) * this.height
        if (ratio > 0) {
          if (position.a > position.x) {
            this.context.fillText('B', Xa, Ya)
            this.context.fillText('A', Xb, Yb)
            this.context.save()
          } else {
            this.context.fillText('A', Xa, Ya)
            this.context.fillText('B', Xb, Yb)
            this.context.save()
          }
        } else if (ratio < 0) {
          if (position.a > position.x) {
            this.context.fillText('A', Xa, Ya)
            this.context.fillText('B', Xb, Yb)
            this.context.save()
          } else {
            this.context.fillText('B', Xa, Ya)
            this.context.fillText('A', Xb, Yb)
            this.context.save()
          }
        } else if (ratio === 0 && position.a > position.x) {
          if (position.a > position.x) {
            this.context.fillText('A', Xa, Ya)
            this.context.fillText('B', Xb, Yb)
            this.context.save()
          } else {
            this.context.fillText('B', Xa, Ya)
            this.context.fillText('A', Xb, Yb)
            this.context.save()
          }
        }
        // if (cross === 'left') {
        // // 绘制文字（参数：要写的字，x坐标，y坐标）
        //   this.context.fillText('A', Xa, Ya)
        //   this.context.fillText('B', Xb, Yb)
        //   this.context.save()
        //   // if (AtoB === 'AtoB') {
        //   //   this.drawArrow(this.context, Xa, Ya, Xb, Yb)
        //   // } else if (AtoB === 'BtoA') {
        //   //   this.drawArrow(this.context, Xb, Yb, Xa, Ya)
        //   // }
        // } else {
        //   this.context.fillText('B', Xa, Ya)
        //   this.context.fillText('A', Xb, Yb)
        //   this.context.save()
        //   // if (AtoB === 'AtoB') {
        //   //   this.drawArrow(this.context, Xb, Yb, Xa, Ya)
        //   // } else if (AtoB === 'BtoA') {
        //   //   this.drawArrow(this.context, Xa, Ya, Xb, Yb)
        //   // }
        // }
      }
    },
    // 鼠标抬起
    canvasUp (e) {
      if (e.button === 2) {
        try {
          this.finishPolygon(e)
        } catch (error) {
          console.error('请绘制完后再右键')
        }
        return
      }
      if (this.lineType === 'line' || this.lineType === 'rec') {
        // // if (this.drawInfo[0] && (this.drawInfo[0].w || this.drawInfo[0].h || this.drawInfo[0].a || this.drawInfo[0].b)) {
        this.canvasMoveUse = false
        if (this.lineType === 'line') {
          this.drawChar(this.cross, this.AtoB, this.drawInfo[0])
        }
        this.$emit('drawFinished', this.drawInfo)
        // }
      }
    },
    // 鼠标右击，表示绘图结束，画多边形时最后一个坐标和起点坐标连线
    finishPolygon (e) {
      if (!this.canvasMoveUse) {
        return
      }
      if (this.canDraw) {
        if (this.lineType === 'polygon') {
          this.cachedDrawInfo = JSON.parse(JSON.stringify(this.drawInfo))
          const pointNo = this.drawInfo.length
          this.context.putImageData(this.beginRec.imageData, 0, 0)
          this.context.beginPath()
          this.context.moveTo(this.drawInfo[pointNo - 1].x * this.width, this.drawInfo[pointNo - 1].y * this.height)
          this.context.lineTo(this.drawInfo[0].x * this.width, this.drawInfo[0].y * this.height)
          this.context.stroke()
          this.canvasMoveUse = false
          this.$emit('drawFinished', this.drawInfo)
        }
      }
    },
    // 清空画布
    clean () {
      this.context.clearRect(0, 0, this.width, this.height)
      this.canvasMoveUse = false
      this.clearDrawInfo()
    },
    // 清空坐标
    clearDrawInfo () {
      this.drawInfo = []
    }
  }
}
</script>
<style lang="less" scoped>
.canvas-draw-panel{
  width: 100%;
  height: 100%;
  .canvas{
    cursor: crosshair;
    width: 100%;
    height: 100%;
  }
}
</style>
