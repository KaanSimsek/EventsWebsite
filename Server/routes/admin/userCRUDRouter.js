const express=require("express");
const userRouter=express.Router()
var mongoose = require('mongoose');
const User = mongoose.model("UserInfo");
const bcrypt = require("bcryptjs");
const cors = require("cors");
userRouter.use(cors());

userRouter.post("/user/delete",async (req,res)=>{
    console.log("Entered")
    const userId=req.body.id;
    const email=req.body.previousData.email;
    const userToDelete = await User.findOne({email});
    console.log(userToDelete)
    await User.findOneAndRemove({email});
    console.log("Before return")
    return res.send(userToDelete);

});

userRouter.post("/users/delete",async(req,res)=>{
    console.log(req.body.ids)
    const ids=req.body.ids
    ids.forEach(async (id)=>{
        await User.findOneAndRemove({_id:id});
    })
    console.log("Entered to multiple delete")
});

userRouter.post("/user",async (req,res)=>{
    const { name, username, email, password } = req.body;

    console.log("entered");
      const encryptedPassword = await bcrypt.hash(password, 10);
      try {
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
            console.log("User exists");
            return res.json({ error: "User Exists" });
        }
        if(password.length<=0 || password.length>10){
            console.log("Invalid password");
            return res.json({ error: "invalid-password" });
        }
        const user=await User.create({
          name:name,
          username:username,
          email:email,
          password: encryptedPassword,
        });

        return res.send(user);
      } catch (error) {
        return res.send({ status: "error" });
      }

});

userRouter.put("/user/:id",async (req,res)=>{
    const body = req.body
    const id=body.id
    const password=await bcrypt.hash(body.data.password,10);
    const email=body.data.email
    const filter = { _id: id };
    const update = { password: password, email:email };
    //const email=body.
    await User.updateOne(filter,update)
    const user = await User.findOne(filter);
    console.log(user)
    return res.send(user)
});


userRouter.get("/user",async (req,res)=>{
    try {
        const user = await User.find();
        res.send(user)
    }catch (e) {
        res.send(e);
    }
});

userRouter.get("/user/:id",async (req,res)=>{
    const id=req.params.id;
    console.log(req.body)
    console.log(req.params)
    try {
        const user = await User.findOne({_id:id});
        console.log(user)
        res.send(user)
    }catch (e) {
        res.send(e);
    }
});


module.exports=userRouter;