<template>
  <div class="main">
    <mohu/>
    <stroke/>
    <text-dir/>
    <text-over/>
  </div>
</template>
<script>
import mohu from '@/components/css-learning/mohu'
import stroke from '@/components/css-learning/stroke'
import TextDir from "@/components/css-learning/text-dir";
import TextOver from "@/components/css-learning/text-over";
export default {
  name: "Ui",
  components: {
    TextOver,
    TextDir,
    mohu,
    stroke
  },
  methods: {
    hell(){
      console.log('hello')
    }
  }
}
</script>

<style scoped>

</style>
