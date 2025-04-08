const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:{
        type:"String",
        required:true,

    },
    Email:{
        type:"String",
        required:true,
        unique:true
    },
    Contact:{
        type:"String",
        required:true
    },
    Password:{
        type:"String",
        required:true,
        minLength:6
    },


})

const User = mongoose.model('User', userSchema); 

module.exports = User