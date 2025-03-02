const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/saveUser',userController.saveUser);
router.post('/getUser',userController.getUser);

module.exports = router;