const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/users', authMiddleware.authenticate, (req, res) => {
    res.send('Khusus user pemilik akun')
});

router.get('/admin', authMiddleware.authenticate, authMiddleware.checkAdminRole, (req, res) => {
 res.send('Dashboard Admin')
});


module.exports = router;