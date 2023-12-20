const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport');

require("dotenv").config();
require("./config/db.connections.js")
require('./config/passport');

const { PORT } = process.env;
const indexRouter = require('./routes/index.js')
const apiRouter = require('./routes/api.js')
const userRouter = require('./routes/user.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.GOOGLE_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allows all domains
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    // Respond with 200 status for preflight requests
    res.sendStatus(200);
    return;
  }
  next();
});

app.use("/api", apiRouter);
app.use("/", indexRouter)
app.use("/user", userRouter)

app.get("/", (req, res) => {
  res.send("npm i -D auto-component");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));