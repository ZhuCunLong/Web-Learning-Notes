import request from '../utils/request'
import {ITodo} from '../store/todo/types'

export const getTodoList = async () => {
  return request({
    url: '/api/todo/list',
    method: 'get'
  })
}

export const addTodo = async (data: ITodo) => {
  return request({
    url: '/api/todo/add',
    method: 'post',
    data
  })
}

export const deleteTodo = async (data: { title: string }) => {
  return request({
    url: '/api/todo/delete',
    method: 'post',
    data
  })
}

export const toggleTodo = async (data: { title: string}) => {
  return request({
    url: '/api/todo/toggle',
    method: 'post',
    data
  })
}
