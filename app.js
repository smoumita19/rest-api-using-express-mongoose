
//importing
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Create express app
const app = express();



//Database
mongoose.connect('mongodb://localhost/motivation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connected'));

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to MongoDB database...");
})

//Middleware
app.use(bodyParser.json());
// app.use(cors);

//Routing

const QuotesRoute = require('./routes/Quotes');
app.use('/quotes', QuotesRoute);

//listening
app.listen(3000);
