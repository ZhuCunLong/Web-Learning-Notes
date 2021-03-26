import {ITodo} from '../todo/types'
import {Reducer} from 'redux'
import {GET_ALL_ITEM, ADD_TODO, TodoActionTypes, TOGGLE_TODO} from './types'

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
    case TOGGLE_TODO:
      return action.todos
    default:
      return state
  }
}
