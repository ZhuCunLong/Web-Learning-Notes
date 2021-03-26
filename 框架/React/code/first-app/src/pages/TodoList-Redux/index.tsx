import React, {Component} from 'react'
import './index.scss'
import TodoItem from '../../component/TodoItem'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {addTodoItemAction, toggleTodoAction, deleteTodoAction} from '../../store/todo/action'
import {ITodo} from '../../store/todo/types'

interface IState {
  todo: string
}

interface IProps {
  todoList: ITodo[],
  addTodo: (todo: string) => void,
  toggleTodo: (index: number) => void,
  deleteTodo: (index: number) => void
}

class TodoListR extends Component<IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      todo: ''
    }
  }

  componentDidMount(): void {
    // this.props.getAllTodoItem()
  }

  public totoItem = (index: number, item: ITodo) => (
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
    const {todoList} = this.props
    const {todo} = this.state
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
            todoList.map((item: any, index: number) => {
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
            todoList.map((item: any, index: number) => {
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
     const index = this.props.todoList.findIndex((item: ITodo) => item.title === this.state.todo)
     if (index === -1) {
       this.props.addTodo(this.state.todo)
       this.setState({
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
    this.props.toggleTodo(index)
  }

  // 输入框内容变化事件
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todo: e.target.value
    })
  }

  handleDelete = (index: number) => {
    this.props.deleteTodo(index)
  }

  // 按钮单击事件
  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.onClickAdd()
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    todoList: state.todo
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (todo: string) => {
      const action = addTodoItemAction(todo)
      dispatch(action)
    },
    toggleTodo: (index: number) => {
      const action = toggleTodoAction(index)
      dispatch(action)
    },
    deleteTodo: (index: number) => {
      const action = deleteTodoAction(index)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListR)
