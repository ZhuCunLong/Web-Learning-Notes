import {TodoActionTypes, ADDTODO, TOGGLETODO, ITodoList} from '../types'
import {Reducer} from 'redux'

const initialState: ITodoList = {
  todoList: [{
    title: '吃饭',
    isFinished: false
  }, {
    title: '睡觉',
    isFinished: true
  }]
}

export const todoReducer: Reducer<ITodoList, TodoActionTypes> = (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case ADDTODO:
      const arr = [...state.todoList]
      arr.push({
        title: action.title,
        isFinished: false
      })
      return {
        todoList: arr
      }
    case TOGGLETODO:
      const arr1 = state.todoList.map((item: any, index: number) =>
        index === action.index ? item.isFinished = !item.isFinished : item
      )
      return {
        todoList: arr1
      }
    default:
      return state
  }
}
