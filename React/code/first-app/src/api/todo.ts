import request from '../../utils/request'

export const getTodoList = () => {
  return request({
    url: '/todo/list',
    method: 'get'
  })
}
