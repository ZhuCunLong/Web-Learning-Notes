import {todoReducer} from './todo/reducer'
import {combineReducers, createStore} from 'redux'
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const rootReducer = combineReducers({
  todo: todoReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default store
