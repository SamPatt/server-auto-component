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

// app.use("/module", modulesRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));