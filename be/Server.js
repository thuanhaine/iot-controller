
require('dotenv').config();

let port = process.env.PORT || 3001;

const cors =  require('cors') 

const mongoString = process.env.DATABASE_URL
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/user/User');


mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



const app = express();


app.use(cors());
app.use(express.json());
app.use('/', routes)
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})