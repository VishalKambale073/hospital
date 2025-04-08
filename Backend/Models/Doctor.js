const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    Name:{
        type:"String",
        required:true,

    },
    Specialization:{
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
    Gender:{
        type:"String",
        required:true,
        enum:["Male","Female"]

    },
    Password:{
        type:"String",
        required:true,
        minLength:6
    },
    Education:{
        type:[String],
        required:true,

    },
    Experience:{
        type:"Number",
        required:true
    },
    Address:{
        type:"String",
        required:true
    },
    Fees:{
        type:"Number",
        required:true
    }


})

const Doctor = mongoose.model('Doctor', doctorSchema); 

module.exports = Doctor