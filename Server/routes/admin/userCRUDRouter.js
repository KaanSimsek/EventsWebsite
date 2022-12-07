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

userRouter.put("/user",async (req,res)=>{
    /*const exUsername=req.body.exUsername;
    const password=await bcrypt.hash(req.body.password, 10);
    const username=req.body.username;
    if(username===""){
        const res = await Product.updateOne({ username:exUsername }, { password: password})
    }
    else if(req.body.password===""){
        const res = await Product.updateOne({ username:exUsername }, {username:username })
    }
    else{
        const res = await Product.updateOne({ username:exUsername }, { password: password,username:username });
    }*/
    

});


userRouter.get("/user",async (req,res)=>{
    try {
        const user = await User.find();
        //console.log(user)
        res.send(user)
    }catch (e) {
        res.send(e);
    }
});

userRouter.get("/user/:id",async (req,res)=>{
    const id=req.body.id;
    console.log("Entere")
    try {
        const user = await User.findOne({id});
        console.log(user)
        res.send(user)
    }catch (e) {
        res.send(e);
    }
});


module.exports=userRouter;