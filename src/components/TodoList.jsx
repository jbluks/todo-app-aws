import React, {Component} from 'react'
import TodoItem from './TodoItem'

//Get the potential FilterValues from our constants
import { FilterValues } from '../constants'

class TodoList extends Component {
  render() {
    let { todos, filter} = this.props

    //Filter the todos based on what filter we are provided
    //Either All, Completed or Incomplete.
    let filteredTodosJSX = todos.filter((todo) => {
      //Use a flag to indicate whether week keep the todo. Setting
      //to true will return all values by default
      let keep = true

      //If we're looking for the complete todos, return all the ones
      //where done is true, if we are looking for Incomplete, return
      //the ones that are not done.
      if(filter === FilterValues.Complete) keep = todo.done
      else if(filter === FilterValues.Incomplete) keep = !todo.done 
      
      return keep
    })
      
    //Map over the filtered Todos and put the todo data in a TodoItem component
    let todosJSX = filteredTodosJSX.map((todo, i) => {
        return <TodoItem 
                  key={i}
                  todo={todo} 
                  index={i} 
                  toggleComplete={this.props.toggleComplete} 
              />
      })

    return (
      <div>
        <ul>
          {todosJSX}
        </ul>
      </div>
    )
  }
}

export default TodoList