import React, {Component} from 'react'
import { FilterValues } from '../constants'

class TodoOptions extends Component {
  render() {
    let optionsJSX = []
    for(let key in FilterValues) {
      optionsJSX.push(
        <option 
          value={FilterValues[key]}
          selected={FilterValues[key] === this.props.filter}
        >
          {key}
        </option>
      )
    }

    return (
      <div>
        <select onChange={
          (e) => {
            this.props.updateFilter(e.target.value)
          }
        }>
          {optionsJSX}
        </select>
        <button onClick={this.props.clearCompletedTodos}>Clear All Complete</button>
      </div>
    )
  }
}

export default TodoOptions