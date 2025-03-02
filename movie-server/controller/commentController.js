const commentModel = require('../model/commentModel')

module.exports = {
    // insert comments
    addcomment:async(req,res)=>{
        try {
            const add = await commentModel.addComment(req.body);
            if(add.acknowledged){
                res.json({message:"comment added successfully!"});
            }
        } catch (error) {
            res.status(400).json({error: 'Failed to add comment!'})
        }
    },
    // get comments
    getcomment:async(req,res)=>{
       try {
          const comments = await commentModel.getComment(req.body);
          if(comments){
            res.json(comments);
          }
       } catch (error) {
          res.status(404).json({error: 'Comments not found!',})
       }
    },
    // get all comments
    getAllComment:async(req,res)=>{
        try {
            const comments = await commentModel.getAllComment();
            if(comments){
                res.json(comments);
            }
        } catch (error) {
            res.status(404).json({error: 'Comments not found!',})
        }
    },
    // remove the comment
    removeComment:async(req,res)=>{
        try {
            const comment  = await commentModel.removeComment(req.body);
            console.log(comment);

            if(comment.deletedCount != 0){
              res.json({message:"comment deleted successfully!"})
            }
        } catch (error) {
            res.json({message:"No comment found!"})  
        }
    }
}