const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();
const JWT_SECRET =process.env.ACCESS_TOKEN_SECRET;
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
console.log("Entered...")
var mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const mongoUrl="mongodb+srv://Kaan:Kaan@cluster0.bw4l0fw.mongodb.net/?retryWrites=true&w=majority";

async function connect(){
    try{
        await mongoose
        .connect(mongoUrl, {
          useNewUrlParser: true,
        })
        .then(() => {
          console.log("Connected to database");
        })
        .catch((e) => console.log(e));
      
      
    }catch(error){
      console.log(error);
    }
}
connect();


require("./userDetails");
require("./adminDetails");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    const userCRUDRouter=require('./routes/admin/userCRUDRouter');
    console.log("Connection ");
   
    const User = mongoose.model("UserInfo");
    const Admin = mongoose.model("AdminInfo");
    async function connet(){
      const password= await bcrypt.hash("ks2019", 10);
      try{
        await Admin.create({
          name:"Kaan Simsek",
          username:"KaanSimsek",
          email:"kaan.simsek01@gmail.com",
          password: password,
        });
        
        
      }catch(error){
        console.log(error);
      }
  }
  //connet();
    
    app.use('/admin',userCRUDRouter)
    
    app.post("/login-user",async (req,res)=>{
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.json({ error: "User Not found" });
        }
        if (await bcrypt.compare(password, user.password)) {
          console.log(process.env.ACCESS_TOKEN_SECRET)
          const token = jwt.sign({ email: user.email,isUser:true }, JWT_SECRET);
          if (res.status(201)) {
            return res.json({ status: "ok", data: token });
          } else {
            return res.json({ error: "error" });
          }
        }
        return res.json({ status: "error", error: "Invalid Password" });
    })
    

    app.post("/register", async (req, res) => {
      const { name, username, email, password } = req.body;
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
        await User.create({
          name:name,
          username:username,
          email:email,
          password: encryptedPassword,
        });
        return res.send({ status: "ok" });
      } catch (error) {
        return res.send({ status: "error" });
      }
    });

    app.post("/login-admin",async (req,res)=>{
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
        if (!admin) {
          console.log("Admin not found");
          return res.json({ error: "User Not found" });
        }
        if (await bcrypt.compare(password, admin.password)) {
          console.log("Okay");
          return res.send({ status: "ok" });
        }
        else{
          console.log("Invalid password");
          return res.json({ status: "error", error: "Invalid Password" });
        }
       
    })
    
    

})

app.listen(4000)