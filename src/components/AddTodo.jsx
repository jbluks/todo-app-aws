import React, {Component} from 'react'

class AddTodo extends Component {
  render() {
    return (
      <div>
        Todo Text: 
        <form ref={self => { this.taskForm = self }} onSubmit={
          (e) => {
            //Add the task when the form is submitted
            //don't reload the page
            e.preventDefault()
            //As long as there is a value in the task box, call the 
            //addTodo prop
            if(this.taskForm.task.value !== '') {
              this.props.addTodo(this.taskForm.task.value)

              //Reset the input to the empty string
              this.taskForm.task.value = ''
            }
          }
        }>
          <input type="text" name="task" />
          <button type="submit" >Add Todo</button>
        </form>
      </div>
    )
  }
}

export default AddTodo