const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./User');

app.use(bodyParser.json());

const User = mongoose.model("User");
const mongoURL = 'mongodb+srv://nothingCanStopMe2k:9vjYfi3oIugjeQCU@cluster0.hi4qb.mongodb.net/Pinder?retryWrites=true&w=majority'

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
  console.log("Connect to mongo yeahhhh");
})

mongoose.connection.on("error", (err) => {
  console.log("Error: ", err);
})

app.get('/', (req, res) => {
  res.send('Welcome to node js');
})

 app.post("/send_user", (req, res) => {
   console.log('user', req.body);
   const user = new User({
    userName: req.body.userName,
    password: req.body.password
  })

  user.save()
  .then(data => {
    console.log(data);
    res.send("Success"); 
  })
  .catch(err => {
    console.log("Error: ", err);
  })

})

app.listen(3000, () => {
  console.log('server running');
})