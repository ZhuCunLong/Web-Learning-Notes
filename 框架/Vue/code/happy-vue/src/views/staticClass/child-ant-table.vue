<template>
  <a-table :columns="realColumns" :data-source="tableData">
    <a slot="name" slot-scope="text">{{ text }}</a>
  </a-table>
</template>

<script>
import { columns, columns1 } from './config'

export default {
  name: 'ChildAntTable',
  props: {
    tableType: {
      type: Number,
      default: 1
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    realColumns () {
      return this.tableType === 1 ? columns : columns1
    }
  }
}
</script>
