const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins (development only)
app.use(cors())

// Middleware for parsing JSON
app.use(express.json());

const movies = require("./movies.json")["movies"]

// get movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// search movies
app.post('/movies/search', (req, res) => {
  const movie = movies.filter((movie) => {
    // if movie is present return the movie 
    if (movie.Title.toLowerCase().includes(req.body.title.toLowerCase()))
      return movie;
  })
  // return movie in json format              
  return res.json(movie);
});

// get movies details
app.post('/movies/movie', (req, res) => {
  const movieDetail = movies.find(movie => movie.Title === req.body.title)
  if (movieDetail) {
    return res.json(movieDetail);
  }
  return res.status(404).json({ error: 'Movie not found' });
});

// get all movies 
app.post('/movies', (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 18;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedMovies = movies.slice(startIndex, endIndex);

  res.json({
    currentPage: page,
    totalPages: Math.ceil(movies.length / limit),
    totalItems: movies.length,
    data: paginatedMovies,
  });
});

// get movies by genre
app.post('/movies/genre', (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 18;
  const genre = req.body.genre;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const movieGenre = movies.filter((movie) => {
    return movie.Genre.toLowerCase().includes(genre.toLowerCase())
  });

  const paginatedMovies = movieGenre.slice(startIndex, endIndex);

  res.json({
    currentPage: page,
    totalPages: Math.ceil(movieGenre.length / limit),
    totalItems: movieGenre.length,
    data: paginatedMovies,
    genre: genre
  });
});

app.listen(3000, () => {
  console.log('Fake server running at http://localhost:3000');
});
