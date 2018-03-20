import React from 'react'

function TodoItem(props) {
  let style = {}
  //Do some styling based on whether the todo is done or not
  if(props.todo.done) {
    style = {
      textDecoration: 'line-through',
      color: 'grey'
    }
  }

  return (
     <li>
        <input 
          type="checkbox" 
          onChange={() => { props.toggleComplete(props.index) }}
          checked={props.todo.done}
        />
        <label style={style}>{props.todo.task}</label>
    </li>
  )
}

// class TodoItem extends Component {
//   render() {
//     let style = {}
//     //Do some styling based on whether the todo is done or not
//     if(this.props.todo.done) {
//       style = {
//         textDecoration: 'line-through',
//         color: 'grey'
//       }
//     }

//     return (
//       <li>
//         <input 
//           type="checkbox" 
//           onChange={() => { this.props.toggleComplete(this.props.index)}}
//           checked={this.props.todo.done}
//         />
//         <label style={style}>{this.props.todo.task}</label>
//       </li>
//     )
//   }
// }

export default TodoItem