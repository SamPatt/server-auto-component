const mongoose = require("mongoose");
const Schema = mongoose.Schema

const moduleSchema = new Schema({
  name: String,
  image: String,
  title: String,
},{timestamps: true});

module.exports = mongoose.model("Module", moduleSchema, "modules");