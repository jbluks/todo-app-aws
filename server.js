const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const fs = require('fs')

//Set up our server to allow cross origin requests
//You can copy and paste this.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Use bodyparser middleware to handle JSON and create req.body for us
app.use(bodyParser.json())

app.use(express.static(__dirname + '/build'));

//Some sample data
//Todos is an object, with usernames as the key, and an array of todos for each username
let todos = {
  jonathan: [
    {
      task: 'Todo 1',
      done: false
    }
  ]
}

//When we start the server, let's load our data from the file
//So that we can use it whenever we restart our server
fs.readFile('todos.json', (err, data) => {
  if(data) {
    todos = JSON.parse(data)
  }
})

app.get('/', (req, res)=> {
  res.send('I\'m alive and well!')
})

//READ End-point
//Given a username as a url param, we will look for that user
//in our object, and send them back the todos if we find the user
app.get('/todos/:username', (req, res) => {
  //Get the username from the params
  let username = req.params.username

  //Look up the username in our object
  //Get the todos for that user
  let savedTodos = todos[username]

  //If we have that user, we can send back the todos we found
  if(savedTodos) res.json(savedTodos)
  //If the user doesn't exist, we can send back an error
  else res.json({status: 'error', error: `User ${username} not found`})
})

//SAVE End-point
//This endpoint will receive a username and an array of todos
//and write them to a file (save them)
app.post('/todos', (req, res) => {
  //Get the username/todos from the request
  let username = req.body.username
  let newTodos = req.body.todos

  //Save the todos to our object for the provided user
  todos[username] = newTodos

  //Write all of our todo data (for each user) to a file.
  //Remember that it needs to be stringified
  fs.writeFile('todos.json', JSON.stringify(todos))

  //Send back a success message
  res.json({ success: true})
})

app.get('*', (req, res) => {
  res.sendFile('index.html',{root: __dirname + '/build'});
});

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
