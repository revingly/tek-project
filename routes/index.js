const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const errorHandlers = require('../handlers/errorHandlers');

// Do work here
router.get('/', authController.isLoggedIn, errorHandlers.catchErrors(userController.index));
router.post('/', errorHandlers.catchErrors(postController.createPost));
router.get('/events', authController.isLoggedIn, (req, res) => res.render('calendar'));
router.get('/chat', authController.isLoggedIn, userController.chat);

router.get('/profile', userController.profile);
router.post('/profile', userController.update);

router.get('/login', (req, res) => {
	res.render('login', {'title': 'login'});
});
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/register', (req, res) => {
	res.render('register', {'title': 'register'});
});

router.post('/register', userController.register, authController.login);

router.get('/contact', userController.contact);
router.post('/contact', userController.sendEmail);

router.post('/comment/:id', errorHandlers.catchErrors(commentController.createComment));

router.get('/calendar', (req, res) => { res.render('calendar')});
router.get('/mail', (req, res) => { res.render('mail')});

//tags routes
router.get('/tags', userController.getTags);
router.post('/tags', userController.createTag);

//courses routes
router.get('/courses', userController.getCourses);

// library routes
router.get('/library', userController.getBooks);

//search
router.get('/search', errorHandlers.catchErrors(userController.search));

//reactions api
router.post('/api/post/:id/like', errorHandlers.catchErrors(userController.like));

module.exports = router;
