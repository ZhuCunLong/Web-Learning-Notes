<template>
  <div>
    <div>
      <h2>{{`id: ${verto1.id}`}}</h2>
      <h2>{{`name: ${verto1.name}`}}</h2>
      <h2>{{`age: ${verto1.age}`}}</h2>
    </div>
  </div>
</template>

<script>
import Verto from '@/utils/verto'
export default {
  name: 'child-class',
  data () {
    return {
      verto1: null
    }
  },
  created () {
    this.verto1 = Verto.getInstance()
  }
}
</script>

<style scoped>

</style>
