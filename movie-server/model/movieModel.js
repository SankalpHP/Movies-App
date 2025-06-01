const connectToMongodb = require('../dbConfig/mongodbConfig');


let db; 
connectToMongodb()
  .then((resolve)=>{
      db = resolve;
  })
  .catch((reject)=>{
      console.log(reject);
  });

module.exports = {
    //  get all movies
    getAllMovies:()=>{
        return db.collection('movies').find().toArray();
    },
    // get movie details by it title
    getDetails:(title)=>{
        return db.collection('movies').findOne({Title:title});
    },
    // get movie by genre
    getGenre:(genre)=>{
        // Use $regex to match the genre string (case-insensitive)
        return db.collection('movies').find({Genre:{ $regex: new RegExp(genre, 'i')}}).toArray(); // 'i' for case-insensitivity
    },

}