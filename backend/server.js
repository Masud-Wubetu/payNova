const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const methosOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express(); 

//Load env variables
dotenv.config();

//Connect to database

//routes

//View engine setup

//Static files
 
//Method override for PUT/DELETE in forms

//Enable cors

//Body parser

//amount api routes

//Home route

//Handle 404

//Error handling

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`))