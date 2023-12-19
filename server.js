const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();
require("./config/db.connections.js")

const { PORT } = process.env;
const modulesRouter = require('./routes/modules.js')
const apiRouter = require('./routes/api.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());

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

// app.use("/module", modulesRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("npm i -D auto-component");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));