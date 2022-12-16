const express=require("express");
const commentRouter=express.Router()
var mongoose = require('mongoose');

const Comments = mongoose.model("Comments");
const bcrypt = require("bcryptjs");
const cors = require("cors");
commentRouter.use(cors());

commentRouter.get("/api/comments",async (req,res)=>{
    try {
        const comment = await Comments.find();
        res.send(comment)
    }catch (e) {
        res.send(e);
    }
});

commentRouter.post("/api/comment",async (req,res)=>{
    const {username, content} = req.body;

    const newComment = await Comments.create({
        username: username,
        comment: content,
    })
    res.send(newComment)

});

module.exports=commentRouter;