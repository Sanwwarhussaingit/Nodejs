
//pre define 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');


//user define require
const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")


//pre defien use
const app = express();
app.use(bodyParser.json());
app.use(cors());

//user define use end point
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

const db = require("./db");


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
