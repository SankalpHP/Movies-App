const express = require('express');
const movieController = require('../controller/moviesController');
const router = express.Router();

router.post('/getallmovies',movieController.fetchAllMovies);
router.post('/search',movieController.Search);
router.post('/movie',movieController.GetDetails);
router.post('/genre',movieController.GetGenre);

module.exports = router