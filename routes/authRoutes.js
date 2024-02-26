const router = require('express').Router();
const { get_userById, post_Verify, post_SignUp } = require('../controllers/authController');

router.get('/user/:id', get_userById);
router.post('/verify', post_Verify)
router.post('/signup', post_SignUp);

module.exports = router