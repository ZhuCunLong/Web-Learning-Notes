import {TodoActionTypes, ADDTODO, TOGGLETODO, DELETETODO, ITodoList} from './types'
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
      const arr1 = [...state.todoList]
      arr1[action.index].isFinished = !arr1[action.index].isFinished
      return {
        todoList: arr1
      }
    case DELETETODO:
      const arr2 = [...state.todoList]
      arr2.splice(action.index, 1)
      return {
        todoList: arr2
      }
    default:
      return state
  }
}
