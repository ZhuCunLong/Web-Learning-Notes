<template>
  <div>
    <h2>{{`id: ${verto.id}`}}</h2>
    <h2>{{`name: ${verto.name}`}}</h2>
    <h2>{{`age: ${verto.age}`}}</h2>
    <br>
    <child-class/>
  </div>
</template>

<script>
import Verto from '@/utils/verto'
import ChildClass from '@/views/staticClass/child-class'
export default {
  name: 'LStaticClass',
  components: { ChildClass },
  data () {
    return {
      verto: null
    }
  },
  created () {
    this.verto = Verto.getInstance({
      id: 6666,
      name: 'zcl',
      age: '15'
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
