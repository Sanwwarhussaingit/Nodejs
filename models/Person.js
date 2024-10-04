const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    age: {
       type: Number,

    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    address: {
        type: String,
    },
    salary:{
        type: Number,
        required: true,
    },

})

//create person model
const Person = mongoose.model('Person',personSchema);

module.exports = Person;