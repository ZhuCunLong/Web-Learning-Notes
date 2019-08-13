import {ITodo} from '../todo/types'
import {Reducer} from 'redux'
import {GET_ALL_ITEM, ADD_TODO, DELETE_TODO, TOGGLE_TODO, TodoActionTypes} from './types'

const initialState: ITodo[] = []

export const todoTReducer: Reducer<ITodo[], TodoActionTypes> = (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case GET_ALL_ITEM:
      return action.todos
    case ADD_TODO:
      return [
        ...state,
        {
          title: action.title,
          isFinished: false
        }
      ]
    case DELETE_TODO:
      const arr1 = [...state]
      arr1[action.index].isFinished = !arr1[action.index].isFinished
      return arr1
    case TOGGLE_TODO:
      const arr2 = [...state]
      arr2.splice(action.index, 1)
      return arr2
    default:
      return state
  }
}
