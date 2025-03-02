// Middleware import
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv');

dotenv.config();

//mongoDB connection string (use environment variables env for security)
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/movieapplication'
const dbName = 'movieapplication';  

// Mongo client
let db;

const connectMongodb = async()=>{
    try {
        const client = await MongoClient.connect(url);
            console.log("Connected to MongoDB!");
            db = client.db(dbName);
            return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the app if the connection fails
    }
}

module.exports = connectMongodb;
