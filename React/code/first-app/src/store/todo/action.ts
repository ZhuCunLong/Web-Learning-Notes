import {ADDTODO, TOGGLETODO} from './types'

export const addTodoItemAction = (title: string) => ({
  type: ADDTODO,
  title
})

export const toggleTodoAction = (index: number) => ({
  type: TOGGLETODO,
  index
})
