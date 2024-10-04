
//pre define 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();


//user define require
const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")


//pre defien use
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

//user define use end point
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

const db = require("./db");


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Listening on 3000");
});
//this ie server