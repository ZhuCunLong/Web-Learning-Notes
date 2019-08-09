import {todoReducer} from './todo/reducer'
import {combineReducers, createStore} from 'redux'

const rootReducer = combineReducers({
  todo: todoReducer
})

const store = createStore(rootReducer)

export default store
