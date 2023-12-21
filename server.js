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

const { PORT } = process.env || 4000;
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

app.use("/", indexRouter)
app.use("/api", apiRouter);
app.use("/user", userRouter)

app.get("/", (req, res) => {
  res.send("npm i -D auto-component");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));