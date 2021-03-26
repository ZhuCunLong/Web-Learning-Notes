import React, {Component} from 'react'
import Button from 'antd/es/button'
import './index.scss'
import {connect} from 'react-redux'
import {deleteTodoItemAction, toggleTodoAction} from '../../store/todo-thunk/action'

interface IProps {
  isFinished: boolean,
  title: string,
  index: number
  toggleTodo?: (title: string, isFinished: boolean) => void,
  deleteTodo?: (title: string) => void
}

interface IState {
}

class TodoItemRT extends Component<IProps, IState> {

  render() {
    const {isFinished, title} = this.props
    return (
      <div className={'todo-item'}>
        <input
          type="checkbox"
          checked={isFinished}
          onChange={this.onClickChange}
        />
        ---{title}---
        <Button type="danger" onClick={this.handleDelete} size={'small'}>删除</Button>
      </div>
    )
  }

  onClickChange = () => {
    if (this.props.toggleTodo) {
      this.props.toggleTodo(this.props.title, this.props.isFinished)
    }
  }

  handleDelete = () => {
    // 这里有点坑，如果在IProps声明了事件函数，不声明为可为空的化，在父组件中
    // 调用组件时必须把这个事件通过父组件传进来，但是这里的这个事件是由react-redux
    // 中间件传进来的，所以就显得有点奇怪，导致这里需要在外层加一层判断
    if (this.props.deleteTodo) {
      this.props.deleteTodo(this.props.title)
    }
  }

}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTodo: (title: string) => {
      const action = deleteTodoItemAction(title)
      dispatch(action)
    },
    toggleTodo: (title: string, isFinished: boolean) => {
      const action = toggleTodoAction(title, isFinished)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(TodoItemRT)
