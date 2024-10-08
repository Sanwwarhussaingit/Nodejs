const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    username:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type: String,
        required: true,
        unique: true
    }

});


// hash password before saving to database
personSchema.pre('save',async function(next){
    const person = this;

    if(!person.isModified('password')) return next();
    //generate salt
    try{
        //generate hash pass
        const salt = await bcrypt.genSalt(10);
        //hash password
        // const hashedPassword = await bcrypt.hashPassword(person.password, salt);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        //set hashed password to password field
        person.password = hashedPassword;
        //continue to save the document
        next();
    }catch(err){    
        return next(err)
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // return await bcrypt.compare(candidatePassword, this.password);
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}
//create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;