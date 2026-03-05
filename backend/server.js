const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs')
const methosOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express(); 

//Load env variables
dotenv.config();

//Connect to database

//routes

//View engine setup
//app.use(expressLayouts);
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "../views"));
//app.set('layout', 'layouts/main');

//Static files
 
//Method override for PUT/DELETE in forms

//Enable cors

//Body parser

//amount api routes

//Home route
app.get('/', (req, res) => {
    res.render('index.html');
});

//Handle 404

//Error handling

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`))