const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

//Load env variables
dotenv.config({ path: path.join(__dirname, '.env') });

const cors = require('cors');
const ejs = require('ejs')
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const { productRouter } = require('./routes/productRoutes');
const { paymentRouter } = require('./routes/paymentRoutes');

//Connect to database
connectDB();

const app = express();

//View engine setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.set('layout', 'layouts/main');

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Method override for PUT/DELETE in forms
app.use(methodOverride('_method'));

//Enable cors
app.use(cors());

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Mount web frontend routes
app.use('/products', productRouter);
app.use('/', paymentRouter);

//Home route
app.get('/', (req, res) => {
    res.render('index');
});

//Handle 404

//Error handling

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`))