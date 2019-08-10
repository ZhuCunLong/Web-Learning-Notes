import React, {Component} from 'react'
import './index.scss'
import TodoItem from '../../component/TodoItem'
import { Button } from 'antd'

interface Todo {
  title: string,
  isFinished: boolean
}

interface IState {
  todoList: Todo[],
  todo: string
}

export default class TodoList extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      todoList: [],
      todo: ''
    }
  }

  public totoItem = (index: number, item: Todo) => (
    <TodoItem
      key={index}
      isFinished={item.isFinished}
      index={index}
      title={item.title}
      handleChange={this.onClickChange}
      handleDelte={this.handleDelete}
    />
  )

  render() {
    const {todoList, todo} = this.state
    return (
      <div className={'center'}>
        <h1>TodoList</h1>
        <input
          type={'text'}
          style={{marginRight: 20}}
          value={todo}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <Button onClick={this.onClickAdd}>添加</Button>
        <h2>待完成</h2>
        <div>
          {
            // eslint-disable-next-line
            todoList.map((item, index) => {
              if (!item.isFinished) {
                return this.totoItem(index, item)
              }
            })
          }
        </div>
        <h2>已完成</h2>
        <div>
          {
            // eslint-disable-next-line
            this.state.todoList.map((item, index) => {
              if (item.isFinished) {
                return this.totoItem(index, item)
              }
            })
          }
        </div>
      </div>
    )
  }

  // 添加按钮点击事件
  onClickAdd = () => {
    if (this.state.todo.trim() === '') {
      window.alert('输入不能为空')
      return
    }
    const index = this.state.todoList.findIndex(item => item.title === this.state.todo)
    if (index === -1) {
      this.setState({
        todoList: [...this.state.todoList, {title: this.state.todo, isFinished: false}],
        todo: ''
      })
    } else {
      window.alert('该事件已添加，请勿重复添加')
      this.setState({
        todo: ''
      })
    }
  }

  // checkbox选中状态变换事件
  onClickChange = (index: number) => {
    const arr = [...this.state.todoList]
    arr[index].isFinished = !this.state.todoList[index].isFinished
    this.setState({
      todoList: arr
    })
  }

  // 输入框内容变化事件
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todo: e.target.value
    })
  }

  handleDelete = (index: number) => {
    const arr = [...this.state.todoList]
    arr.splice(index, 1)
    this.setState({
      todoList: arr
    })
  }

  // 按钮单击事件
  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.onClickAdd()
    }
  }
}
