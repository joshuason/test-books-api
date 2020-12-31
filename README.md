# books-api-express

Test project with the intention of developing a RESTful API that utilises basic CRUD operations. Also to familiarise myself with the following tech:

- Express.js
- AWS (Lambda, DynamoDb)

### References

Predominately follows along and uses examples from [Tania Rascia's: Build a Node.js, Express, & PostgreSQL REST API](https://www.taniarascia.com/node-express-postgresql-heroku/) with help/meshed with various other tutorials/sites:

- [Deploy a REST API using Serverless, Express and Node.js – Alex DeBrie](https://www.serverless.com/blog/serverless-express-rest-api)
- [Node.js, Express.js, and PostgreSQL: CRUD REST API example – Tania Rascia](https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example)

And docs:

- [AWS Working with DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithDynamo.html)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)
- [Amazon DynamoDB – API Reference](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)

## Uses:

#### 1. get book by bookId

```
curl ${BASE_DOMAIN}/<bookId>
```

#### 2. get all books

```
curl ${BASE_DOMAIN}/books
```

#### 3. add/create book

```
curl -H 'Content-Type: application/json' -X POST ${BASE_DOMAIN}/books -d '{ "bookId": <bookId>, "title": <title>, "author": <author> }'
```

#### 4. update book

```
curl -H 'Content-Type: application/json' -X PUT ${BASE_DOMAIN}/books/<bookId> -d '{ "title": <title>, "author": <author> }'
```

#### 5. delete book

```
curl -X 'DELETE' ${BASE_DOMAIN}/books/<bookId>
```
