import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import TodoList from "./pages/TodoList/TodoList";


function App() {
  return (
	  <Router>
		  <Route exact path="/" component={Home}/>
		  <Route exact path="/todolist" component={TodoList}/>
	  </Router>
  );
}

export default App;
