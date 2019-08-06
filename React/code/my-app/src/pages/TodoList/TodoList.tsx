import React,{ Component } from 'react'
import './TodoList.scss'

interface IState {
    count: number,
}

export default class TodoList extends Component<{}, IState> {
  render() {
    return (
      <div className="center">
             todolist准备
       </div>
    );
  }
}
