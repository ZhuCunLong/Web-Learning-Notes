import React, {Component} from 'react'
import './index.scss'
import TodoItem from '../../component/TodoItemRT'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {getAllItemsAction, addTodoItemAction} from '../../store/todo-thunk/action'
import {ITodo} from '../../store/todo/types'

interface IState {
  todo: string
}

interface IProps {
  todoList: ITodo[],
  addTodo: (todo: string) => void,
  toggleTodo: (index: number) => void,
  deleteTodo: (title: string) => void
  getAllTodoItem: () => void
}

class TodoListRT extends Component<IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      todo: ''
    }
  }

  componentDidMount(): void {
    this.props.getAllTodoItem()
  }

  public totoItem = (index: number, item: ITodo) => (
    <TodoItem
      key={index}
      isFinished={item.isFinished}
      index={index}
      title={item.title}
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
    this.props.addTodo(this.state.todo)
    this.setState({
      todo: ''
    })
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

  handleDelete = (title: string) => {
    this.props.deleteTodo(title)
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
    todoList: state.todot
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllTodoItem: () => {
      const action = getAllItemsAction()
      dispatch(action)
    },
    addTodo: (todo: string) => {
      const action = addTodoItemAction(todo)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListRT)
