const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const errorHandlers = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');

router.get('/', authController.isLoggedIn, authController.isAdmin, adminController.dashboard);
router.get('/register', authController.isLoggedIn, adminController.register);
router.post('/register', adminController.createUser);
router.get('/students', authController.isLoggedIn,   adminController.getStudents);
router.post('/students/:id/lock', authController.isLoggedIn,  errorHandlers.catchErrors(adminController.lockStudent));
router.post('/students/:id/unlock', authController.isLoggedIn,  errorHandlers.catchErrors(adminController.unlockStudent));
router.post('/students/:id/delete', authController.isLoggedIn,  errorHandlers.catchErrors(adminController.deleteStudent));
router.post('/students/:id/edit', authController.isLoggedIn,  adminController.updateStudent);
router.get('/emails', authController.isLoggedIn,   adminController.getEmails);
router.get('/teachers', authController.isLoggedIn,   adminController.getTeachers);
router.get('/events', authController.isLoggedIn,   adminController.getEvents);
//books
router.get('/books', authController.isLoggedIn, 
            authController.isAdmin, errorHandlers.catchErrors(adminController.getBooks));
router.post('/books', authController.isLoggedIn, 
            authController.isAdmin, adminController.createBook);
//courses
router.get('/books', authController.isLoggedIn, 
authController.isAdmin, errorHandlers.catchErrors(adminController.getCourses));
router.post('/books', authController.isLoggedIn, 
authController.isAdmin, adminController.createCourse);

module.exports = router;