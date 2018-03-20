import React, { Component } from 'react'
import './App.css'
import {
  AddTodo,
  TodoList,
  TodoOptions
} from './components'
import axios from 'axios'

import { FilterValues } from './constants' 

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: props.todos, //Set our initial state to todos we have received on props
      filter: FilterValues.All  //Set our intial filter to 'All'
    }
  }

  //This will be run once when the component loads. 
  componentDidMount() {
    //Try and load our state from localstorage. If the user has previously
    //used our app, we can load it from localStorage
    //let savedState = JSON.parse(localStorage.getItem('TODO_STATE'))

    //Use axios to go to our server. Pass the username on the URL
    axios.get(`https://localhost:8080/todos/${this.username.value}`)
      .then((response) => {
        //Update our state to be the todos that the server
        //sends back to us
        this.setState({
          todos: response.data
        })
      }) 

    //If we found a savedState, update our state to be what we
    //loaded from localStorage
    // if(savedState) {
    //   this.setState(savedState)
    // }
  }

  //Whenever the state changes this function will be called.
  componentDidUpdate() {
    //Save our state to local storage. This will 'autosave' the current
    //state of our Todo application
    //localStorage.setItem('TODO_STATE', JSON.stringify(this.state))

    //Save our todos to the server. Send the username and the todos
    //in a POST request
    axios.post('https://localhost:8080/todos', { 
      todos: this.state.todos,
      username: this.username.value
    })
      .then((response) => {
        if(response.data.success) {
          console.log('Todos Saved.')
        }
      })
  }

  //Event handler for toggling a todo as complete/incomplete
  toggleComplete = (index) => {
    //Create a new array that we will modify (prevents the mutating state warning)
    let todos = this.state.todos.slice()
    
    //Update the todo at the provided index to be the inverse of it's current value (toggle it)
    todos[index].done = !todos[index].done
    
    //Update the state
    this.setState({
      todos
    })
  }

  //Event handler for adding a new todo
  addTodo = (task) => {
    //Add a new todo the list of todos
    this.setState({
      todos: this.state.todos.concat({
        task,
        done: false
      })
    })
  }

  //Event handler for changing the filter
  updateFilter = (filter) => {
    this.setState({
      filter
    })
  }

  //Event handler that will remove all of the completed todos
  clearCompletedTodos = () => {
    //create an array that only has the todos that are not done
    let filteredTodos = this.state.todos.filter((todo) => {
      return !todo.done
    })

    //update the state to contain the filtered todos.
    this.setState({
      todos: filteredTodos
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <input type="text" ref={(self) => this.username = self} value="jonathan" />
        <AddTodo addTodo={this.addTodo} />
        <TodoList 
          todos={this.state.todos} 
          toggleComplete={this.toggleComplete} 
          filter={this.state.filter}
        />
        <TodoOptions 
          updateFilter={this.updateFilter} 
          clearCompletedTodos={this.clearCompletedTodos}
          filter={this.state.filter}
        />
      </div>
    );
  }
}

export default App;
