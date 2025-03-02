const connectToMongodb = require('../dbConfig/mongodbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    saveUser:async(body)=>{
        // connect to db
        const db = await connectToMongodb();
        const{username,email,password} = body;
        const role = ["user"];

        // Encrypt the password
        const saltRound = 10; // Number of salt rounds for hashing
        const hashpassword = await bcrypt.hash(password,saltRound)

        return db.collection('users').insertOne({name:username,email:email,role:role,password:hashpassword})
    },

    getUser:async(body)=>{
       // connect db
       const db = await connectToMongodb();
       const{email,password} = body;

       // Find the user by email
       const user = await db.collection('users').findOne({email:email});

       if(!user){
          return ({message:"User not found"}); 
       }

       // Compare the hashed password with the provided password
       const isMatch = await bcrypt.compare(password,user.password)
       if(!isMatch){
         return {message:"Invalid Credentials"};
       }

       // Generate a JWT
       const token = jwt.sign({id:user._id,name:user.name,email:user.email,role:user.role},'my-secret-key',{expiresIn:'1d'});

       return {message:'Login successfully!',userId:user._id,userName:user.name,token:token};
    }
}