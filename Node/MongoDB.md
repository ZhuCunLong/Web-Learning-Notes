# MongoDB

## 关系型数据库和菲关系型数据库

表就是关系

或者说表与表之间存在关系

- 所有的关系数据库都需要通过sql语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空

- 非关系数库非常灵活
- 有的非关系型数据库就是key-value对儿
- 但是MoogoDB是长得最像关系型数据的非关系型数据库
  - 数据库-》数据库
  - 数据表-》集合（数组）
  - 表记录-》(文档对象)

- MongoDB不需要设计表结构
- 也就是说你可以任意的往里面存数据，没有结构性这么一说

## 启动和关闭数据库

启动

```shell
# mongodb默认使用执行mongod命令所处盘符根目录下的/data/db作为自己的数据存储目录
# 所以在第一次执行该命令之前先手动创建一个/data/db
mongod
```

如果想要修改默认的数据存储目录，可以：

```shell
mongod --pbpath=数据存储目录路径
```

停止：

```shell
在开启服务的控制台，直接Ctrl+c即可停止
或者直接关闭开启服务的控制台
```

## 连接和退出数据库

连接

```shell
# 该命令默认链接本地的MonggoDB服务
mongo
```

退出

```shell
# 在连接状态输入 exit退出连接
exit
```

## 基本命令

- `show dbs`
  
- 查看显示所有数据库
  
- `db`
  
- 查看当前操作的数据库
  
- `use 数据库名称`
  
- 切换到指定的数据库（如果没有会新建）
  
- 插入数据

  ```shell
  db.students.insertOne({"name":"Jack"})
  ```


## 在node中如何操作MongoDB数据

### 使用官方的mongodb包

https://github.com/mongodb/node-mongodb-native

### 使用第三方的mongoose来操作MongoDB数据库

第三方包，mongoose基于MongoDB官方的mongoDB包做了再一次封装

https://mongoosejs.com/

## MongoDB数据库的基本概念

- 可以由多个数据库
- 一个数据库可以有多个集合（数据库表）
- 一个集合中可以有多个文档（库表记录）
- MongoDB非常灵活，不需要像Mysql一样先创建数据库、表、设计表结构
  - 在这里只需要，当你需要插入数据的时候，只需要指定往哪个数据的哪个集合操作就可以了
  - 一切都由MongoDB来帮你自动完成建库建表这件事

```json
{
  // 数据库
  qq:{
    // 集合
    user{
      // 文档
     	{name:'张三',age: 18},
  		{name:'张三',age: 18},
			{name:'张三',age: 18},
			{name:'张三',age: 18}
    },
    productions{
  
    }
  },
  taobao{
  
  },
  baidu{
    
  },
}
```

## 官方指南

### 设计Scheme发布Model

```ts
import {Document, model, Schema, Model, Mongoose} from 'mongoose'

const todoSchema: Schema = new Schema({
  titile: String,
  isFinished: Boolean
})

interface ITodo extends Document {
  titile: string;
  isFinished: boolean;
}

// 将文档发布为模型
// 第一个参数传入一个大写名词单数字符串用来表示库表（集合）名称，mongoose会自动将大写名词的字符串
// 生成小写复数形式的集合名称
const todoModel: Model<ITodo> = model<ITodo>('Todo', todoSchema)
```

### 插入数据

```ts
const todoItem = new todoModel({
  titile: '吃饭',
  isFinished: false
})

todoItem.save((err, res) => {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(res)
  }
})
```

### 查询

查询所有：

```ts
todoSchema.find((err,res)=>{
  if(err){
    console.log('查询失败')
  } else {
    console.log(res)
  }
})
```

按条件查询所有

```ts
todoSchema.find({isFinished: false},(err,res)=>{
  if(err){
    console.log('查询失败')
  } else {
    console.log(res)
  }
})
```

按条件查询单个

```ts
todoSchema.findOne({isFinished: false},(err,res)=>{
  if(err){
    console.log('查询失败')
  } else {
    console.log(res)
  }
})
```

### 删除



