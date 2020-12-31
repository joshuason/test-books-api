const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./queries')

app.use(bodyParser.json({ strict: false }));

app.get('/',(req, res) => {
  res.send('Hello World!')
})

app.get('/books/:bookId', db.getBookById)
app.get('/books', db.getAllBooks)
app.post('/books', db.createBook)
app.put('/books/:bookId', db.updateBook)
app.delete('/books/:bookId', db.deleteBook)

module.exports.handler = serverless(app);