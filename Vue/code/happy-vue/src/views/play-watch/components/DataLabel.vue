<template>
  <div>
    <span style="margin-right: 20px">
      name:<span class="text-red">{{person.name}}</span>
    </span>
    <span>
      checked:<span class="text-red">{{person.checked}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'DataLabel',
  props: ['person'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.text-red{
  color: red;
}
</style>
