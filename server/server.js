const express = require('express');
// const account = require("./models/accounts");
const accountRoutes = require("./routes/accountRoutes");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passportLocal = require("passport-local").Strategy;
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express();


////******************MIDDLEWARES**************** */

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser('secret-key'));
app.use(passport.initialize());
app.use(passport.session());
require('./Auth/passportConfig')(passport);

app.use(express.json());
require("./connection.js");
app.use("/", accountRoutes);

app.listen(5000);