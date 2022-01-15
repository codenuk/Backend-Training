const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const mysql = require('mysql');

const connectDatabase = mysql.createConnection({
  host: "192.168.1.110",
  port: "3306",
  user: "root",
  password: "password",
  database: "product"
});

connectDatabase.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const productsRouter = require('./Routers/product.routes');

app.use('/product', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

app.listen(4000, () => {
  console.log('Application is running on port 4000')
})
