const express = require('express')
const app = express()
app.get('/', function (req, res) {
  res.send('Hello World wellcome to our hotel how can i help you')
})
app.get("/meat", (req,res)=>{
    res.send('i am thank full to serve you ')
})
app.get("/pizza", (req,res)=>{
    let customized = {
        size: 'Medium',
        crust: 'Thin',
        toppings: false,
    }
    res.send(customized)    
})
app.listen(3000, ()=>{
    console.log("listening on localhost:3000");
})

