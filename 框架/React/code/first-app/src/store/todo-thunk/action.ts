import {ADD_TODO, GET_ALL_ITEM, TOGGLE_TODO} from './types'
import {getTodoList, addTodo, deleteTodo, toggleTodo} from '../../api/todo'
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
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    })
  }
}

export const deleteTodoItemAction = (title: string) => {
  return (dispatch: any) => {
    const params = {title}
    deleteTodo(params).then((res: any) => {
      if (res.status === 1) {
        dispatch({
          type: GET_ALL_ITEM,
          todos: res.data
        })
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    })
  }
}

export const toggleTodoAction = (title: string, isFinished: boolean) => {
  return async (dispatch: any) => {
    const params = {title, isFinished}
    const {status, data, msg}: any = await toggleTodo(params)
    if (status === 1) {
      dispatch({
        type: TOGGLE_TODO,
        todos: data
      })
      // message.success(msg)
    } else {
      message.error(msg)
    }
  }
}
