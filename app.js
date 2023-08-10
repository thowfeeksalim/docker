const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const MONGODB_URI = 'mongodb://mongo:27017/todo_app'; // Use the service name "mongo"
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Todo = mongoose.model('Todo', { text: String });

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving todos' });
  }
});
app.get('/version', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({"version":"1.0.0"});
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving todos' });
  }
});

app.get('/v2', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({"version":"3.0.0"});
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving todos' });
  }
});
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
