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
router.post('/', postController.createPost);

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

//testing route
router.get('/test/:pr', userController.gettesting);
router.post('/test/:pr', userController.posttesting);

module.exports = router;
