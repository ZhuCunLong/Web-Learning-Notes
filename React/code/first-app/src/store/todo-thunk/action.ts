import {ADD_TODO, TOGGLE_TODO, DELETE_TODO, GET_ALL_ITEM} from './types'
import {getTodoList, addTodo} from '../../api/todo'
import {ITodo} from '../todo/types'
import {message} from 'antd'

export const getAllItemsAction = () => {
  return (dispatch: any) => {
    getTodoList().then((res: any) => {
      const todos = res.data
      dispatch({
        type: GET_ALL_ITEM,
        todos
      })
      console.log('success: ' + res.msg)
    })
  }
}

export const addTodoItemAction = (title: string) => {
  return (dispatch: any) => {
    const todo = {title, isFinished: false}
    addTodo(todo).then((res: any) => {
      if (res.status === 1) {
        dispatch({
          type: ADD_TODO,
          title
        })
        console.log('success: ' + res.msg)
      } else {
        message.error(res.msg)
      }
    })
  }
}

/*
export const getAllItemsAction = (todos: ITodo[]) => ({
  type: GETALLITEM,
  todos
})
*/

/*export const addTodoItemAction = (title: string) => ({
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
})*/
