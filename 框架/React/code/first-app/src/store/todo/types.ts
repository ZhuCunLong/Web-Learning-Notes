export const ADDTODO = 'ADDTODO'
export const TOGGLETODO = 'TOGGLETODO'
export const DELETETODO = 'DELETETODO'
export const GETALLITEM = 'GETALLITEM'

// state类型
export interface ITodo {
  title: string,
  isFinished: boolean
}

interface IAddAction {
  type: typeof ADDTODO,
  title: string
}

interface IToggleAction {
  type: typeof TOGGLETODO,
  index: number
}

interface IDeleteAction {
  type: typeof DELETETODO,
  index: number
}

export type TodoActionTypes = IAddAction | IToggleAction | IDeleteAction
