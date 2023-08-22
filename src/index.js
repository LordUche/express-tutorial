const express = require('express')
const path = require('path')
const morgan = require('morgan')

const todos = [
  { id: 1, title: 'Learn Node.js', description: 'Learn all the basics of Node.js', completed: true },
  { id: 2, title: 'Learn React.js', description: 'Learn and master React', completed: false },
]

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.get('/', (req, res) => {
  console.log(todos)
  res.render('index', { todos })
})

app.post('/', (req, res) => {
  const { title, description } = req.body
  const id = todos.length + 1
  const todo = { id, title, description, completed: false }
  todos.push(todo)
  res.redirect('/')
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  const todo = todos.find((todo) => todo.id == id)
  res.render('detail', { todo })
})

app.patch('/:id', (req, res) => {
  const id = req.params.id
  const { completed } = req.body
  const todo = todos.find((todo) => todo.id == id)
  todo.completed = completed
  res.send('OK')
})

app.delete('/:id', (req, res) => {
  const id = req.params.id
  const index = todos.findIndex((todo) => todo.id == id)
  todos.splice(index, 1)
  res.status(204).end()
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username === 'admin' && password === 'admin') {
    res.send('Login success')
  } else {
    res.status(401).send('Login failed')
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
