import request from '../utils/request'
import {ITodo} from '../store/todo/types'

export const getTodoList = async () => {
  return request({
    url: '/api/todo/list',
    method: 'get'
  })
}

export const addTodo = async (params: ITodo) => {
  return request({
    url: 'api/todo/add',
    method: 'get',
    params
  })
}
