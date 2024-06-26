const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const booksController = require('../controllers/books.controller');
const likesController = require('../controllers/likes.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const upload = require('./storage.config');

router.get('/', (req, res, next) => res.render('home'))

router.get('/register', authMiddleware.isNotAuthenticated, usersController.register);
router.post('/register', authMiddleware.isNotAuthenticated, upload.single('avatar'), usersController.doRegister);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/profile', authMiddleware.isAuthenticated, usersController.getCurrentUserProfile);

router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

// Books

router.get('/books', booksController.getBooks);
router.get('/books/:id', booksController.getBook);

// Likes

router.post('/books/:id/like', authMiddleware.isAuthenticated, likesController.doLike);

module.exports = router;