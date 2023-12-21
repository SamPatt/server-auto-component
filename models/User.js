const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const componentSchema = new Schema({
  title: String, 
  content: String,
}, {
  timestamps: true
});


const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  components: [componentSchema] 
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema, "user");
