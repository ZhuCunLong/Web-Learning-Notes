<template>
  <div>
    <draw-window style="height: 500px"></draw-window>
  </div>
</template>

<script>
import DrawWindow from '@/components/draw-window/index'
export default {
  name: 'playCanvas',
  components: { DrawWindow },
  data () {
    return {
    }
  },
  methods: {
    test () {
    }
  }
}
</script>

<style scoped lang="less">
</style>
