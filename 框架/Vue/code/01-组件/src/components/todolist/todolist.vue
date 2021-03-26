<template>
  <div class="main todolist">
    <h1>TodoList</h1>
    <input v-model="thing" type="text" @keyup.13="OnAdd"><button @click="OnAdd">添加</button>
    <h2>待办事项</h2>
    <div v-for="(item, index) in list" :key = "index">
      <label v-if="!item.status">
        <input v-model="item.status" type="checkbox">-----{{ item.label }}-----<button @click="OnDelete(item.label)">删除</button>
      </label>
    </div>
    <hr>
    <h2>已完成事项</h2>
    <div v-for="(item, index) in list" :key = "index + 'un'">
      <label v-if="item.status">
        <input v-model="item.status" type="checkbox">-----{{ item.label }}-----<button @click="OnDelete(item.label)">删除</button>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todolist",
  data() {
    return {
      thing: '',
      list: []
    }
  },
  methods: {
    OnAdd(){
      if(!this.thing){
        alert('内容不能为空')
        return
      }
      if(!this.isExist()){
        this.list.push(
          {
            label: this.thing,
            status: false
          }
        )
      } else {
        alert(this.thing + '已存在')
      }
      this.thing = ''
    },
    OnDelete(label) {
      let index;
      for(let i = 0;i<this.list.length;i++) {
        if(this.list[i].label === label){
          index = i;
          break;
        }
      }
      this.list.splice(index, 1);
    },
    isExist(){
      return this.list.some((item) => {
        return item.label === this.thing
      })
    }
  }
}
</script>

<style scoped>
  .todolist{
    width: 400px;
    margin: 0 auto;
  }
</style>
