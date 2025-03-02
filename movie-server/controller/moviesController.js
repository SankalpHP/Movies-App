const movieModel = require('../model/movieModel');

module.exports = {
     // search movies
    Search:async(req,res) => {
        try {
            const movies = await movieModel.getAllMovies();

                const movie = movies.filter((movie) => {
                    // if movie is present return the movie 
                    if (movie.Title.toLowerCase().includes(req.body.title.toLowerCase()))
                        return movie;
                })
            // return movie in json format              
            return res.json(movie);
        } catch (error) {
            res.status(404).json({ error: 'Movie not found' });
        }
           
    },
    // get movies details
    GetDetails:async(req,res) => {
        try {
            const movieDetail = await movieModel.getDetails(req.body.title);
            if (movieDetail) {
              return res.json(movieDetail);
            }
            return res.status(404).json({ error: 'Movie not found' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch movies' });
        }
    }, 
    // get all movies
    fetchAllMovies : async (req,res)=>{
        try{
            const movies = await movieModel.getAllMovies();

            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 18;

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedMovies = movies.slice(startIndex, endIndex);
      
            res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(movies.length / limit),
                totalItems: movies.length,
                data: paginatedMovies,
              });

        }catch(err){
            res.status(500).json({ error: 'Failed to fetch movies' });
        }
    },
    // get movies by genre
    GetGenre:async(req,res)=>{
        try {
            const genre = await movieModel.getGenre(req.body.genre);
           
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 18;

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedMovies = genre.slice(startIndex, endIndex);

            res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(genre.length / limit),
                totalItems: genre.length,
                data: paginatedMovies,
                genre: genre
              });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch movies' });
        }
    },
}