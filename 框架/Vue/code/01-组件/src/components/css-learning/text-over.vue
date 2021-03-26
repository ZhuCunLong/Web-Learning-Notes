<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "TextOver",
  data() {
    return {
      message: '祝存龙祝存龙祝存龙祝存龙祝存龙祝存龙祝存龙祝存龙祝存龙'
    }
  }
}
</script>

<style scoped>
  div{
    width: 200px;
    height: 200px;
    border: 1px solid;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
