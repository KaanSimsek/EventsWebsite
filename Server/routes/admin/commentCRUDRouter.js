const express=require("express");
const commentRouter=express.Router()
var mongoose = require('mongoose');

const Comments = mongoose.model("Comments");
const bcrypt = require("bcryptjs");
const cors = require("cors");
commentRouter.use(cors());

commentRouter.get("/api/comments/:id",async (req,res)=>{
    try {
        const comment = await Comments.find({venueID: req.params.id});
        res.send(comment)
    }catch (e) {
        res.send(e);
    }
});

commentRouter.post("/api/comment/:id",async (req,res)=>{
    const {username, content} = req.body;
    const venueID = Number(req.params.id)
    Comments.create({
        username: username,
        comment: content,
        venueID: venueID
    }, (err, c) => {
        res.status(201).send(c)
    })

});

module.exports=commentRouter;