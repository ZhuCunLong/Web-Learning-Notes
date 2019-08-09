import {ADDTODO, TOGGLETODO} from './types'

export const addTodoItemAction = (title: string) => ({
  type: ADDTODO,
  title
})

export const toggleTodoAction = (isFinished: boolean) => ({
  type: TOGGLETODO,
  isFinished
})
