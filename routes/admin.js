const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isLoggedIn, isAdmin } = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');
const classesController = require('../controllers/classesController');
const subjectController = require('../controllers/subjectController');

router.get('/', isLoggedIn,  adminController.dashboard);
router.get('/register/', isLoggedIn, adminController.register);
router.post('/register/', adminController.createUser);
router.get('/students/', isLoggedIn, adminController.getStudents);
router.post('/students/:id/lock/', isLoggedIn, catchErrors(adminController.lockStudent));
router.post('/students/:id/unlock/', isLoggedIn, catchErrors(adminController.unlockStudent));
router.post('/students/:id/delete/', isLoggedIn, catchErrors(adminController.deleteStudent));
router.post('/students/:id/edit/', isLoggedIn,  adminController.updateStudent);
router.get('/mails/', isLoggedIn, adminController.getEmails);
router.get('/teachers/', isLoggedIn, adminController.getTeachers);
router.get('/events/', isLoggedIn, adminController.getEvents);
//books
router.get('/books/', isLoggedIn, 
             catchErrors(adminController.getBooks));
router.post('/books/', isLoggedIn, 
             adminController.createBook);
//courses
router.get('/courses/', isLoggedIn, 
             catchErrors(adminController.getCourses));
router.post('/courses/', isLoggedIn, 
               adminController.createCourse);

//classes
router.get('/classes/', isLoggedIn, 
            catchErrors(classesController.getClasses));
router.get('/classes/:name/students/', isLoggedIn, classesController.getClasseStudents);
router.post('/classes/:name/students', isLoggedIn, classesController.addStudentsToClasse);
router.get('/classes/:name/subjects/', isLoggedIn, classesController.getClasseSubjects);
router.post('/classes/', isLoggedIn, 
            classesController.createClasse);

//subjects
router.get('/subjects/', isLoggedIn, 
            catchErrors(subjectController.getSubjects));
router.post('/subjects/', isLoggedIn, 
            catchErrors(subjectController.createSubject));


module.exports = router;