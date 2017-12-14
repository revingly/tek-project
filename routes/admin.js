const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isLoggedIn, isAdmin } = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');
const departmentController = require('../controllers/departmentController');
const classesController = require('../controllers/classesController');
const subjectController = require('../controllers/subjectController');

router.get('/', isLoggedIn, isAdmin, adminController.dashboard);
router.get('/register', isLoggedIn, adminController.register);
router.post('/register', adminController.createUser);
router.get('/students', isLoggedIn, adminController.getStudents);
router.post('/students/:id/lock', isLoggedIn, catchErrors(adminController.lockStudent));
router.post('/students/:id/unlock', isLoggedIn, catchErrors(adminController.unlockStudent));
router.post('/students/:id/delete', isLoggedIn, catchErrors(adminController.deleteStudent));
router.post('/students/:id/edit', isLoggedIn,  adminController.updateStudent);
router.get('/emails', isLoggedIn, adminController.getEmails);
router.get('/teachers', isLoggedIn, adminController.getTeachers);
router.get('/events', isLoggedIn, adminController.getEvents);
//books
router.get('/books', isLoggedIn, 
            isAdmin, catchErrors(adminController.getBooks));
router.post('/books', isLoggedIn, 
            isAdmin, adminController.createBook);
//courses
router.get('/books', isLoggedIn, 
            isAdmin, catchErrors(adminController.getCourses));
router.post('/books', isLoggedIn, 
              isAdmin, adminController.createCourse);

//departments
router.get('/departments', isLoggedIn, isLoggedIn, 
            catchErrors(departmentController.getDepartments));
router.post('/departments', isLoggedIn, isLoggedIn,
            catchErrors(departmentController.createDepartment));
router.get('/departments/:id', isLoggedIn, isAdmin,
            catchErrors(departmentController.getDepartmentById));

//classes
router.get('/departments/:id/classes', isLoggedIn, isAdmin,
            catchErrors(classesController.getClasses));
router.post('/departments/:id/classes', isLoggedIn, isAdmin,
            classesController.createClasse);

//subjects
router.get('/departments/:id/subjects', isLoggedIn, isAdmin,
            catchErrors(subjectController.getSubjects));
router.post('/departments/:id/subjects', isLoggedIn, isAdmin,
            catchErrors(subjectController.createSubject));


module.exports = router;