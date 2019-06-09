<template>
  <input :type="type" :value="value" @input="onInput">
</template>

<script>
export default {
  name:'KInput',
  props:{
    value:{
      type: String,
      default: ''
    },
    type:{
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onInput(e){
      this.$emit('input', e.target.value);
    }
  }
}
</script>

<style scope>
</style>