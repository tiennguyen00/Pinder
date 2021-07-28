const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var ip = require("ip");
console.log ( ip.address() );

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

app.post("/login", async (req, res) => {
  let user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password
  })

  if(user){
    console.log('usser: ', user);
    res.send("Success")
  }
  else
    res.send("Failed")
})

app.post("/forgotPassword", async (req, res) => {
  let user = await User.findOne({
    userName: req.body.userName
  })
  console.log(user);
  if(user) {
    res.send(user.password)
  }
  else {}
    // res.send("Failed");
})

app.listen(3000, () => {
  console.log('server running');
})

// app.get("/getAllUser", async (req, res) => {
//   User.find()
// })
