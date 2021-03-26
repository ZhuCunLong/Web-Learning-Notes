import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import TodoList from './pages/TodoList'
import {Provider} from 'react-redux'
import TodoListR from './pages/TodoList-Redux'
import TodoListRT from './pages/TodoList-Redux-Thunk'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={'menu'}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todolist">TodoList</Link>
            </li>
            <li>
              <Link to="/todolist_redux">TodoList-redux</Link>
            </li>
            <li>
              <Link to="/todolist_thunk">TodoList-thunk</Link>
            </li>
          </ul>
        </div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/todolist" component={TodoList}/>
        <Route exact path="/todolist_redux" component={TodoListR}/>
        <Route exact path="/todolist_thunk" component={TodoListRT}/>
      </Router>
    </Provider>
  )
}

export default App
