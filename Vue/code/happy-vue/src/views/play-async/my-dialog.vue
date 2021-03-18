<template>
  <el-dialog
    title="提示"
    :visible="visible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleSure">确 定</el-button>
    <el-button type="primary" @click="handleCancel">取消</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSure () {
      this.$emit('update:visible', false)
    },
    handleCancel () {
      this.$emit('update:visible', false)
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
