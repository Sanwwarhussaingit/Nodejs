
//pre define 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

//user define require
const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")
const db = require("./db");
const passport = require('./auth')


//pre defien use
const app = express();
app.use(bodyParser.json());
app.use(cors());


//passport
app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false})



//user define use end point
const PORT = process.env.PORT
app.use('/person',localAuthMiddleware,personRoutes)
app.use('/menu',menuRoutes)




app.get("/",(req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Listening on 3000");
});
//this ie server