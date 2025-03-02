const express = require('express')
const commentController = require('../controller/commentController')
const router = express.Router();

router.post('/addcomment',commentController.addcomment);
router.post('/getcomments',commentController.getcomment);
router.post('/getallcomments',commentController.getAllComment);
router.post('/removecomments',commentController.removeComment);

module.exports = router;