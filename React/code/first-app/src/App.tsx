import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import TodoList from './pages/TodoList'

function App() {
  return (
    <Router>
      <div className={'menu'}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todolist">TodoList</Link>
          </li>
        </ul>
      </div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/todolist" component={ TodoList } />
    </Router>
  )
}

export default App
