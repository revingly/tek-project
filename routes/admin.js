const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const errorHandlers = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');

router.get('/',  adminController.dashboard);
router.get('/students',  adminController.getStudents);
router.post('/students/:id/lock', errorHandlers.catchErrors(adminController.lockStudent));
router.post('/students/:id/unlock', errorHandlers.catchErrors(adminController.unlockStudent));
router.post('/students/:id/delete', errorHandlers.catchErrors(adminController.deleteStudent));
router.post('/students/:id/edit', adminController.updateStudent);
router.post('/students', userController.register);
router.get('/emails',  adminController.getEmails);
router.get('/teachers',  adminController.getTeachers);
router.get('/events',  adminController.getEvents);


module.exports = router;