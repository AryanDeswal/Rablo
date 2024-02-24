const router = require('express').Router();
const { post_Verify, post_SignUp } = require('../controllers/authController');

router.post('/verify', post_Verify)
router.post('/signup', post_SignUp);

module.exports = router