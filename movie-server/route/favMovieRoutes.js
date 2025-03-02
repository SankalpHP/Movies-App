const express = require('express');
const favmovieController = require('../controller/favmovieController');
const router = express.Router();

router.post('/addfav',favmovieController.addfavMovie);
router.post('/getfav',favmovieController.getfavMovie);
router.post('/removie',favmovieController.removefavMovie)

module.exports = router;