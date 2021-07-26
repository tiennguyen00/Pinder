const mongoose = require('mongoose');

const User = new mongoose.Schema({
  userName: String,
  password: String
}, {
  timestamps: true
})

mongoose.model("User", User);