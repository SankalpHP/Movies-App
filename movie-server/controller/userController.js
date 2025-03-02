const userModel = require('../model/userauthModel');

module.exports = {
    saveUser:async(req,res)=>{
        try {
            const save = await userModel.saveUser(req.body);
            if(save.acknowledged){
               res.json({msg:"Register successfully!"})
            }
        } catch (error) {
            res.status(404).json({error:"Failed to register!"})
        }
    },
    getUser:async(req,res)=>{
        try {
             const user  = await userModel.getUser(req.body);
             if(user){
                res.json({user})
             }
        } catch (error) {
            res.status(500).json({error:"User not found!"})
        }
    }
}