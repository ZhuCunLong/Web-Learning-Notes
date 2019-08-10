import {TodoActionTypes, ADDTODO, TOGGLETODO, DELETETODO, ITodo} from './types'
import {Reducer} from 'redux'

const initialState: ITodo[] = []

export const todoReducer: Reducer<ITodo[], TodoActionTypes> = (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case ADDTODO:
      return [
        ...state,
        {
          title: action.title,
          isFinished: false
        }
      ]
    case TOGGLETODO:
      const arr1 = [...state]
      arr1[action.index].isFinished = !arr1[action.index].isFinished
      return arr1
    case DELETETODO:
      const arr2 = [...state]
      arr2.splice(action.index, 1)
      return arr2
    default:
      return state
  }
}
