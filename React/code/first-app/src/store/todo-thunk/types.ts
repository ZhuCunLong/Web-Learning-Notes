import {ITodo} from '../todo/types'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const GET_ALL_ITEM = 'GET_ALL_ITEM'

interface IGetAllAction {
  type: typeof GET_ALL_ITEM,
  todos: ITodo[]
}

interface IAddAction {
  type: typeof ADD_TODO,
  title: string
}

interface IToggleAction {
  type: typeof TOGGLE_TODO,
  todos: ITodo[]
}

interface IDeleteAction {
  type: typeof DELETE_TODO,
  title: number
}

export type TodoActionTypes = IAddAction | IToggleAction | IDeleteAction | IGetAllAction
