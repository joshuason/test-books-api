const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const BOOKS_TABLE = process.env.BOOKS_TABLE;

const getBookById = (req, res) => {
  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookId: req.params.bookId,
    },
  }

  dynamoDb.get(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'Could not get book.' });
    }
    if (data.Item) {
      res.status(200).json(data.Item);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  })
}

const getAllBooks = (req, res) => {
  const params = {
    TableName: BOOKS_TABLE,
  }

  dynamoDb.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'Could not get books.' });
    }
    if (data.Items) {
      res.status(200).json(data.Items);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  })
}

const createBook = (req, res) => {
  const { bookId, title, author } = req.body;
  if (typeof bookId !== 'string') {
    res.status(400).json({ error: '"bookId" must be a string' });
  } else if (typeof title !== 'string') {
    res.status(400).json({ error: '"title" must be a string' });
  } else if (typeof author !== 'string') {
    res.status(400).json({ error: '"author" must be a string' });
  }

  const params = {
    TableName: BOOKS_TABLE,
    Item: {
      bookId,
      title,
      author,
    },
    ConditionExpression: 'attribute_not_exists(bookId)',
  };
  /* Conditional put ^ */
  dynamoDb.put(params, (err) => {
    if (err) {
      console.log(err)
      res.status(400).json({ error: `Could not create book -> ${err}` });
    } else {
      res.status(200).send(`Book created: ${JSON.stringify(params.Item)}`)
    }
  })
}

const updateBook = (req, res) => {
  const { bookId } = req.params
  const { title, author } = req.body

  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookId: bookId,
    },
    ExpressionAttributeValues: {
      ':t': title,
      ':a': author,
    },
    ConditionExpression: 'attribute_exists(bookId)',
    UpdateExpression: 'SET title = :t, author = :a',
    ReturnValues: 'ALL_NEW'
  }

  dynamoDb.update(params, (err, data) => {
    if (err) {
      console.log(err)
      res.status(400).json({ error: `Could not update book -> ${err}` });
    } else {
      res.status(200).send(`Book updated: ${JSON.stringify(data.Attributes)}`)
    }
  })
}

const deleteBook = (req, res) => {
  const { bookId } = req.params

  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookId: bookId
    },
    ConditionExpression: 'attribute_exists(bookId)',
    ReturnValues: 'ALL_OLD'
  }

  dynamoDb.delete(params, (err, data) => {
    if (err) {
      console.log(err)
      res.status(400).json({ error: `Could not delete book -> ${err}` });
    } else {
      res.status(200).send(`Book deleted: ${JSON.stringify(data.Attributes)}`)
    }
  })
}

module.exports = {
  getBookById,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
}