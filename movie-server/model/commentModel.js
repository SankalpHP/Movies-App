const { ObjectId } = require('mongodb');
const connectToMongodb = require('../dbConfig/mongodbConfig');

module.exports = {
    // insert a comment
    addComment:async(body)=>{
        // connect to mongodb
        const db = await connectToMongodb();
       
        // current date
        const date = new Date();
        const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        return db.collection('comments').insertOne({movie:body.movie,comment:body.comment,username:body.username,date:currentDate,userid:body.id});
     },
    // get comments
    getComment:async(body)=>{
         // connect to mongodb
        const db = await connectToMongodb();

        return db.collection('comments').find({movie:body.title}).sort({date:-1}).limit(6).toArray();
    },
    // get all comments
    getAllComment:async()=>{
         // connect to mongodb
        const db = await connectToMongodb();

        return db.collection('comments').find().toArray();
    },
    removeComment:async(body)=>{
        // connect to mongodb
        const db = await connectToMongodb();
        console.log( body.id);
        
        // Ensure ID is converted properly
        const commentId = new ObjectId(String(body.id));  
        
        return db.collection('comments').deleteOne({_id:commentId});
    }
}