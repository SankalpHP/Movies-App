const connectToMongodb = require('../dbConfig/mongodbConfig')

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
    // save user favorite movie
    savefavMovie:async(body)=>{
      // return query result 
        return db.collection('favorite').insertOne({Title:body.title,Poster:body.poster,Username:body.username,UserId:body.userId});
    },

    // get user favorite movie
    getfavMovie:async(body)=>{
      // return query result   
        return db.collection('favorite').find({UserId:body.userId}).toArray();
    },

    // remove the favorite movie
    removefavMovie:async(body)=>{
      // return query result     
        return db.collection('favorite').deleteOne({$and:[{UserId:body.id,Title:body.title}]});
    },

    // movie already exist's
    existfavMovie:async(body)=>{
      // return query result
        return db.collection('favorite').findOne({$and:[{UserId:body.userId,Title:body.title}]});
    }
}
