const connectToMongodb = require('../dbConfig/mongodbConfig')

module.exports = {
    // save user favorite movie
    savefavMovie:async(body)=>{
      // connecting to mongodb
        const db = await connectToMongodb(); 
      // return query result 
        return db.collection('favorite').insertOne({Title:body.title,Poster:body.poster,Username:body.username,UserId:body.userId});
    },
    // get user favorite movie
    getfavMovie:async(body)=>{
      // connecting to mongodb
        const db = await connectToMongodb();
      // return query result   
        return db.collection('favorite').find({UserId:body.userId}).toArray();
    },
    // remove the favorite movie
    removefavMovie:async(body)=>{
      // connecting to mongodb
        const db = await connectToMongodb();
      // return query result     
        return db.collection('favorite').deleteOne({$and:[{UserId:body.id,Title:body.title}]});
    },
    // movie already exist's
    existfavMovie:async(body)=>{
      // connecting to mongodb
        const db = await connectToMongodb();
      // return query result
        return db.collection('favorite').findOne({$and:[{UserId:body.userId,Title:body.title}]});
    }
}
