# vue绑定事件原理

```vue
<el-button @clcik="handleClick"></el-button>
<script>
export default{
	methods: {
    handleClick(){
      console.log(...arguments)
    }
  }
}
</script>
```

这种情况下，点击事件函数的默认参数只可能是event对象，这个是没有问题的

但是如果传进去的函数是带参数的

```vue
<el-button @clcik="handleClick('nice')"></el-button>
<script>
export default{
	methods: {
    handleClick(){
      console.log(...arguments)
    }
  }
}
</script>
```

点击事件打印的结果是`nice`

