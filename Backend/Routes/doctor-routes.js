const express = require('express')
const {displayDoctors} = require('../Controllers/doctor-controllers')

const router = express.Router();

router.get('/displayalldoctors',displayDoctors)