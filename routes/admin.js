const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');


router.get('/',  adminController.dashboard);
router.get('/students',  adminController.getStudents);
router.get('/emails',  adminController.getEmails);
router.get('/teachers',  adminController.getTeachers);
router.get('/events',  adminController.getEvents);
router.get('/tags', adminController.getTags);
router.post('/tags', adminController.createTag);

module.exports = router;