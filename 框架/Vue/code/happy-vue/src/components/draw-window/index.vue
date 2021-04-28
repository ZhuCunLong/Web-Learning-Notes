<template>
  <div class="canvas-content">
    <div class="canvas-pic" ref="canvasWrapper">
      <canvas-draw-panel
        ref="canvas"
        :width="width"
        :height="height"
        positionElId= "canvas-pic"
        @drawFinished="getInfo"
        :lineType="lineType"
        :info="info"/>
      <div class="polygon-alert" v-if="showPolygonTip || lineType === 'polygon'">
        <el-alert title="点击鼠标右键完成绘制" type="info" simple></el-alert>
      </div>
      <div class="canvas-background">
        <img
          :src="backgroundImg"
          :onerror="defaultImg"
          alt
          style="user-select:none"
          @mousedown.prevent
          draggable="false"
        />
        <span class="remark" v-show="showRemark">请在此处添加绘制区域</span>
      </div>
    </div>
    <div class="canvas-toolbar" v-if="showToolBar">
      <div class="canvas-toolbar-buttons">
        <el-radio-group v-model="lineType" @change="changeType">
          <el-radio-button label="line" class="radio-line">
            <div class="lineBackground"></div>
          </el-radio-button>
          <el-radio-button label="polygon" class="radio-polygon">
            <div class="polygonBackground"></div>
          </el-radio-button>
          <el-radio-button label="rec" class="radio-polygon">
            <div class="recBackground"></div>
          </el-radio-button>
          <el-radio-button label="circle" class="radio-polygon">
            <div class="recBackground"></div>
          </el-radio-button>
        </el-radio-group>
      </div>
      <el-button @click="clearInfo" style="margin-right: 10px;">恢复默认</el-button>
    </div>
  </div>
</template>

<script>
import CanvasDrawPanel from '@/components/canvas-draw-panel/index'
import picDefault from '@/assets/components/pic-default.png'
const DEFAULT_AREA = [{
  x: 0.01,
  y: 0.01
}, {
  x: 0.99,
  y: 0.01
}, {
  x: 0.99,
  y: 0.99
}, {
  x: 0.01,
  y: 0.99
}]
const PATTERN_TYPE = ['line', 'polygon', 'rec', 'circle']
export default {
  name: 'DrawWindow',
  components: { CanvasDrawPanel },
  props: {
    backgroundImg: {
      type: String,
      default: picDefault
    },
    showToolBar: {
      type: Boolean,
      default: true
    },
    toolBarMenu: {
      type: Array,
      default: () => PATTERN_TYPE
    },
    value: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function (value) {
        if (value) {
          const item = {
            ...value,
            type: this.lineType
          }
          this.info = [item]
        }
      }
    }
  },
  mounted () {
    const parentDom = this.$refs.canvasWrapper
    this.width = parentDom.offsetWidth
    this.height = parentDom.offsetHeight
  },
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/components/pic-default.png') + '"',
      cachedActiveRule: {}, // 目前选中的规则
      width: 0, // canvas宽高
      height: 0,
      lineType: 'line',
      info: [], // 规则的坐标信息，用于画canvas
      showPolygonTip: false,
      showRemark: true
    }
  },
  methods: {
    // 获取坐标
    getInfo (info) {
      this.$emit('input', [...info][0])
      // 获取完后清空canvas中的坐标信息
      this.$refs.canvas.clearDrawInfo()
    },
    // 点击重置，重置canvas,重置后的结果为一个几乎全屏的矩形框
    drawCanvas (position) {
      const type = PATTERN_TYPE[position.drawAreaType]
      if (type === 'line') {
        return [
          {
            type,
            x: position.ruleArea[0].x,
            y: position.ruleArea[0].y,
            a: position.ruleArea[1].x,
            b: position.ruleArea[1].y
          }
        ]
      } else if (type === 'rec') {
        return [
          {
            type,
            x: position.ruleArea[0].x,
            y: position.ruleArea[0].y,
            w: position.ruleArea[1].x - position.ruleArea[0].x || position.ruleArea[3].x - position.ruleArea[0].x,
            h: position.ruleArea[2].y - position.ruleArea[1].y || position.ruleArea[1].y - position.ruleArea[0].y
          }
        ]
      } else if (type === 'polygon') {
        const region = position.ruleArea.map(point => {
          return {
            x: point.x,
            y: point.y
          }
        })
        return [
          {
            type,
            region
          }
        ]
      }
    },
    clearInfo () {
      // this.info = []
      this.$refs.canvas && this.$refs.canvas.clean()
      this.cachedActiveRule.ruleArea = DEFAULT_AREA
      this.cachedActiveRule.drawAreaType = 2
      this.info = this.drawCanvas({
        drawAreaType: this.cachedActiveRule.drawAreaType,
        ruleArea: this.cachedActiveRule.ruleArea
      })
      this.cachedActiveRule.lineDirection = ''
      this.showPolygonTip = this.lineType === 'polygon'
    },
    changeType () {
      this.$refs.canvas && this.$refs.canvas.clean()
    }
  }
}
</script>

<style scoped lang="less">
.canvas-content {
  display: flex;
  flex-direction: column;
  .canvas-pic {
    position: relative;
    border: 1px solid #e5e5e5;
    flex: 1;
    width: 100%;
    height: 100%;
    .canvas-background {
      position: absolute;
      top: 0;
      left:0;
      bottom: 0;
      right:0;
      z-index: -1;
      img{
        width: 100%;
        height: 100%;
      }
      .remark {
        position: absolute;
        bottom: 100px;
        left: 0;
        right: 0;
        text-align: center;
      }
    }
  }
  .canvas-toolbar {
    display: flex;
    justify-content: space-between;
    background-color: white;
    height: 43px;
    align-items: center;
    border: 1px solid #e5e5e5;
    .canvas-toolbar-buttons {
      line-height: 1;
      padding-left: 10px;
      display: flex;
      .common-bg{
        position: relative;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-origin: border-box; //从border开始填充
        background-clip: border-box; //border外的多余背景图片不展示，截取掉，
        overflow: hidden;
      }
      /deep/ .el-radio-button__inner {
        padding: 6px 7px;
        line-height: 100%;
        font-size: 20px;
        border: none !important;
      }
      .radio-polygon {
        margin-right: 10px;
        .polygonBackground {
          background-image: url("../../assets/components/wujiao.svg");
          .common-bg();
        }
        .recBackground {
          background-image: url("../../assets/components/juxing.svg");
          .common-bg();
        }
      }
      .radio-line {
        margin-right: 10px;
        /deep/ .el-radio-button__inner {
          line-height: 100%;
        }
        .lineBackground {
          background-image: url("../../assets/components/xian.svg");
          .common-bg();
        }
      }
    }
  }
}
</style>
