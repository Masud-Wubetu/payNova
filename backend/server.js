const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

//Load env variables
dotenv.config({ path: path.join(__dirname, '.env') });

const cors = require('cors');
const ejs = require('ejs')
// const methodOverride = require('method-override');
// const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const { productRouter } = require('./routes/productRoutes');
const { paymentRouter } = require('./routes/paymentRoutes');
const authRouter = require('./routes/authRoutes');

//Connect to database
connectDB();

const app = express();

// app.use(expressLayouts);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "../views"));
// app.set('layout', 'layouts/main');

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Method override for PUT/DELETE in forms
// app.use(methodOverride('_method'));

//Enable cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Mount web frontend routes
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api', paymentRouter);

//Home route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to payNova API" });
});

//Handle 404

//Error handling

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`))