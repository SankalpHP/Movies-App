const connectToMongodb = require('../dbConfig/mongodbConfig');

module.exports = {
   
    //  get all movies
    getAllMovies:async()=>{
        const db = await connectToMongodb();
        return db.collection('movies').find().toArray();
    },
    // get movie details by it title
    getDetails:async(title)=>{
        const db = await connectToMongodb();
        return db.collection('movies').findOne({Title:title});
    },
    // get movie by genre
    getGenre:async(genre)=>{
        const db = await connectToMongodb();
        // Use $regex to match the genre string (case-insensitive)
        return db.collection('movies').find({Genre:{ $regex: new RegExp(genre, 'i')}}).toArray(); // 'i' for case-insensitivity
    },

}