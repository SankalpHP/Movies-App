const { json } = require('express');
const favmovieModel = require('../model/favmovieModel');

module.exports = {
    // save user favorite movie
    addfavMovie:async(req,res)=>{
        try {
            // check is already in user fav or not
            const getmovie = await favmovieModel.existfavMovie(req.body);
            if(getmovie){
                return res.json({message:"Looks like you love this movie! It's already in your favorites."})
            }else{
                const savemovie = await favmovieModel.savefavMovie(req.body);
                if(savemovie){
                    return res.json({message:"Successfully added to your favorites."})
                }
            }
        } catch (error) {
            return res.json({Error:error})
        }
    },
    // get user favorite movie
    getfavMovie:async(req,res)=>{
        try {
            const getmovie = await favmovieModel.getfavMovie(req.body);
            if (getmovie.length != 0) {
                return res.json({getmovie});
            }
          return res.json({message:"No Movie Found!",getmovie:getmovie})   
        } catch (error) {
            return res.json({Error:error})
        }
    },
    // remove the favorite movie
    removefavMovie:async(req,res)=>{
        try {
            const remove = await favmovieModel.removefavMovie(req.body);
            if(remove.deletedCount){
               return res.json({message:"movie remove from your favorite!"})
            }
            return res.json({message:"movie does not exists!"})
        } catch (error) {
            return res.json({error})
        }
    }
}