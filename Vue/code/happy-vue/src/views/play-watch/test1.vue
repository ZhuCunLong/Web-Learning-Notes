<!--
数组绑定测试
-->
<template>
  <div>
    <h1>在data中声明数组</h1>
    <div class="main">
      <div class="main-left">
        <my-checkbox
          v-for="(person,index) in personList"
          :key="index"
          :person="person"></my-checkbox>
        <hr/>
        <el-checkbox v-model="checkAll" @change="handleChangeAll">全选</el-checkbox>
        <my-checkbox
          v-for="(person) in personList1"
          :key="person.name"
          :person="person"></my-checkbox>
        <hr/>
        <div>
          <el-button size="mini" @click="handleClick">造数据</el-button>
        </div>
        <el-checkbox v-model="checkAll2" @change="handleChangeAll2">全选</el-checkbox>
        <check-list
          ref="checkList"
          :person-list="personList2"></check-list>
      </div>
      <div class="main-right">
        <h4>数据展示</h4>
        <ul>
          <li
            v-for="(person,index) in personList"
            :key="index">
            <data-label :person="person"></data-label>
          </li>
        </ul>
        <hr/>
        <ul>
          <li
            v-for="(person,index) in personList1"
            :key="index">
            <data-label :person="person"></data-label>
          </li>
        </ul>
        <hr/>
        <ul>
          <li
            v-for="(person,index) in personList2"
            :key="index">
            <data-label :person="person"></data-label>
          </li>
        </ul>
      </div>
    </div>
    <div class="result">
      <h4>结论</h4>
      <div>1.data中已经初始化的数组正常</div>
      <div>2.data中未初始化的数组也能正常双绑</div>
      <div>3.蓝色边框的list组件中，通过watch监听了外层传入的personList2,
        通过数组的map方法给list组件中的listData赋值</div>
      <div>这里根据map中回调的实现出现了分差</div>
      <div class="left-space-20">
        1)通过item.<span style="color: blue">关键字</span>赋值
        <span class="left-space-20">双绑<span style="color: red">失败</span></span>
        且外部数组的元素中也包含赋值的关键字
      </div>
      <div class="left-space-20">
        2)通过this.$set(item, <span style="color: blue">关键字</span>, <span style="color: blue">内容</span>)赋值
        <span class="left-space-20">双绑<span style="color: #13ce66">成功</span></span>
        且外部数组的元素中也包含赋值的关键字
      </div>
      <div class="left-space-20">
        3)通过结构赋值给关键字赋值
        <span class="left-space-20">双绑<span style="color: #13ce66">成功</span></span>
        外部数据中<span style="color: #ffba00">不包含</span>赋值的关键字
      </div>
      <div class="left-space-20">
        4)只做拷贝不对新的关键字赋值
        <span class="left-space-20">双绑<span style="color: #13ce66">成功</span></span>
        el-checkbox会自动给双绑的变量赋值
        外部数据中<span style="color: #ffba00">不包含</span>赋值的关键字
      </div>
      <div>综上所述：除了方法1之外，其他方法都能使checkbox完成双绑并更新勾选状态</div>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/views/play-watch/components/MyCheckbox'
import DataLabel from '@/views/play-watch/components/DataLabel'
import CheckList from '@/views/play-watch/components/CheckList'
export default {
  name: 'test1',
  components: { CheckList, DataLabel, MyCheckbox },
  data () {
    return {
      personList: [
        {
          name: 'zcl',
          checked: false
        },
        {
          name: 'zyt',
          checked: false
        }
      ],
      personList1: [],
      personList2: [],
      checkAll: false,
      checkAll2: false
    }
  },
  created () {
    setTimeout(() => {
      this.personList1 = [
        {
          name: 'xxx'
        },
        {
          name: 'uuu'
        }
      ]
      this.handleData()
    }, 100)
  },
  methods: {
    handleData () {
      const data = [
        {
          name: 'xxx'
        },
        {
          name: 'uuu'
        }
      ]
      this.personList1 = data.map(item => {
        item.checked = true
        return item
      })
    },
    handleClick () {
      const data = Array.from({ length: 5 }, (v, i) => {
        return {
          name: 'xxx' + i
        }
      })
      /*      const data = [
        {
          name: 'xxx',
          checked: false
        },
        {
          name: 'uuu',
          checked: false
        }
      ] */
      setTimeout(() => {
        this.personList2 = [...data]
      }, 1000)
    },
    handleChangeAll (val) {
      this.personList1 = this.personList1.map(item => {
        item.checked = val
        return item
      })
    },
    handleChangeAll2 (val) {
      this.$refs.checkList.toggleSelectAll(val)
    }
  }
}
</script>

<style scoped lang="less">
@import "./main";
.left-space-20{
  margin-left: 20px;
}
</style>
