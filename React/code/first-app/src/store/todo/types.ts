export const ADDTODO = 'ADDTODO'
export const TOGGLETODO = 'TOGGLETODO'

interface IAddAction {
  type: typeof ADDTODO,
  title: string
}

interface IToggleAction {
  type: typeof TOGGLETODO,
  index: number
}

export type TodoActionTypes = IAddAction | IToggleAction

// state类型
export interface ITodo {
  title: string,
  isFinished: boolean
}

export interface ITodoList {
  todoList: ITodo[]
}
