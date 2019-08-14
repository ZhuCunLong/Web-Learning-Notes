import {ADDTODO, TOGGLETODO, DELETETODO} from './types'

export const addTodoItemAction = (title: string) => ({
  type: ADDTODO,
  title
})

export const toggleTodoAction = (index: number) => ({
  type: TOGGLETODO,
  index
})

export const deleteTodoAction = (index: number) => ({
  type: DELETETODO,
  index
})
