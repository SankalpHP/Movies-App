const { ObjectId } = require('mongodb');
const connectToMongodb = require('../dbConfig/mongodbConfig');

// connect to mongodb
let db; 
connectToMongodb()
  .then((resolve)=>{
      db = resolve;
  })
  .catch((reject)=>{
      console.log(reject);
  });

module.exports = {
    // insert a comment
    addComment:(body)=>{
        // current date
        const date = new Date();
        const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        return db.collection('comments').insertOne({movie:body.movie,comment:body.comment,username:body.username,date:currentDate,userid:body.id});
     },

    // get comments
    getComment:(body)=>{
        return db.collection('comments').find({movie:body.title}).sort({date:-1}).limit(6).toArray();
    },

    // get all comments
    getAllComment:async()=>{
        return db.collection('comments').find().toArray();
    },

    // remove the comments
    removeComment:async(body)=>{ 
        // Ensure ID is converted properly
        const commentId = new ObjectId(String(body.id));  
        return db.collection('comments').deleteOne({_id:commentId});
    }
}