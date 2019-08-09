import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import TodoList from './pages/TodoList'
import {Provider} from 'react-redux'
import TodoListR from './pages/TodoList-Redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/*<div className={'menu'}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todolist">TodoList</Link>
            </li>
            <li>
              <Link to="/todolist_radux">TodoList-redux</Link>
            </li>
          </ul>
        </div>*/}
        <TodoListR />
        <Route exact path="/" component={Home}/>
        <Route exact path="/todolist" component={TodoList}/>
        <Route exact path="/todolist_radux" component={TodoListR}/>
      </Router>
    </Provider>
  )
}

export default App
