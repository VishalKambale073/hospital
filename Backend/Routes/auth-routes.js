const express = require("express");
const {userRegistration,userLogin,logout} = require('../Controllers/auth-controller')
const {displayAppointmentsForDoctor,doctorAppointment,displayAllAppointments,updateAppointmentStatus,displayCompletedAppointments,displayIncompletedAppointments} = require('../Controllers/appointment-controller')
const {doctorRegistration,displayAllDoctors,displayDoctorById,updateDoctor,doctorLogout,doctorLogin} = require('../Controllers/doctor-controllers')
const router = express.Router();

router.post('/register',userRegistration);
router.post('/doctorregistration',doctorRegistration);
router.post('/login',userLogin)
router.post('/doctorlogin',doctorLogin)
router.post('/doctorlogout',doctorLogout)
router.post('/logout',logout)
router.post('/bookappointment',doctorAppointment)
router.get('/alldoctors',displayAllDoctors)
router.get("/displayappointmentsfordoctor", displayAppointmentsForDoctor);

router.get('/displaydoctorbyid/:id',displayDoctorById)
//router.get('/displayallappointments',displayAllAppointments)
//router.get('/displayappointments',displayAppointmentsForDoctor)
router.get('/displaycompletedappointments',displayCompletedAppointments)
router.get('/displayincompletedappointments',displayIncompletedAppointments)
router.put('/updateappointmentstatus',updateAppointmentStatus)
router.put('/updateDoctor',updateDoctor)

module.exports = router