<template>
  <div class="main component-b" >
    <div class="main-left">
      <my-checkbox
        v-for="(person,index) in listData"
        :key="index"
        :person="person"></my-checkbox>
    </div>
    <div class="main-right">
      <ul>
        <li
          v-for="(person,index) in listData"
          :key="index">
          <data-label :person="person"></data-label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/views/play-watch/components/MyCheckbox'
import DataLabel from '@/views/play-watch/components/DataLabel'
export default {
  name: 'CheckList',
  components: { MyCheckbox, DataLabel },
  props: {
    personList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    personList: {
      immediate: true,
      handler (personList) {
        this.listData = personList.map(item => {
          /* // item.checked = true
          this.$set(item, 'checked', false)
          return item */
          return {
            ...item,
            checked: false
          }
        })
        console.log('change')
      }
    }
  },
  created () {
    /* const data = [
      {
        name: 'xxx'
      },
      {
        name: 'uuu'
      }
    ]
    setTimeout(() => {
      this.listData = [...data]
    }, 1000) */
  },
  data () {
    return {
      listData: []
    }
  },
  methods: {
    toggleSelectAll (val) {
      this.listData = this.listData.map(item => {
        item.checked = val
        return item
      })
    }
  }
}
</script>

<style scoped lang="less">
.component-b{
  padding: 2px ;
  border: 1px solid cyan;
}
</style>
