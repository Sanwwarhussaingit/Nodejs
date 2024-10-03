const { log } = require("console")

const mongoose = require('mongoose')

//define the mongo db cannection url
const hotelsURL= 'mongodb://localhost:27017/hotels'
//connect to the mongodb server and log connection status
mongoose.connect(hotelsURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
})
//get the default connection
const db = mongoose.connection;
//on connection event
db.on('connected', ()=>{
    log('Connected to MongoDB hotels')
})

db.on('error', (err) => {
    log(`ERROR: Could not connect to MongoDB. ${err.message}`)
})

db.on('disconnected',()=>{ 
    log('MongoDB disconnected')
})
module.exports = db;
