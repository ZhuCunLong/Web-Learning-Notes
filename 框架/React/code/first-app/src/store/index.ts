import {combineReducers, createStore, applyMiddleware} from 'redux'
import {todoReducer} from './todo/reducer'
import {todoTReducer} from './todo-thunk/reducer'
import thunk from 'redux-thunk'

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const rootReducer = combineReducers({
  todo: todoReducer,
  todot: todoTReducer
})

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
