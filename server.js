require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
const errorHandler = require('./_middlewares/error-handler');

//api routes
app.use('/users', require('./users/user.controller'));

//global error handler
app.use(errorHandler);

//start server

const port = process.env.NODE_ENV ==='production' ? (process.env.PORT || 80) : 4000;

app.listen(port, ()=>console.log(`Server listening on port ` + port));