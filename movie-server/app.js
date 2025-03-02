// imports
const express = require('express');
const connectToMongoDB = require('./dbConfig/mongodbConfig');
var cors = require('cors')
const movieRoute = require('./route/movieRoute');
const commentRoute = require('./route/commentRoutes');
const userRoute = require('./route/userRoutes');
const favRoute = require('./route/favMovieRoutes')
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;

// Enable CORS for all origins (development only)
app.use(cors())

// middleware for parses(resolve) incoming JSON requests and puts the parsed(resolved) data in req.body.
app.use(express.json());

// movies middleware route
app.use('/movies',movieRoute);
// comment middleware route
app.use('/comment',commentRoute)
// user middleware route
app.use('/user',userRoute)
// fav middleware route
app.use('/fav',favRoute)

// Start the server after establishing the MongoDB connection
app.listen(PORT,async ()=>{
    await connectToMongoDB();
    console.log(`Movies Server Running at port http://localhost:${PORT}`);
    
});