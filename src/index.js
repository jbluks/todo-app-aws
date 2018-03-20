import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const todos = [
  {
    task: 'Todo 1',
    done: false
  },
  {
    task: 'Todo 2',
    done: false
  },
  {
    task: 'Todo 3',
    done: true
  },
  {
    task: 'Todo 4',
    done: true
  },

]

ReactDOM.render(<App todos={todos} />, document.getElementById('root'));
registerServiceWorker();
