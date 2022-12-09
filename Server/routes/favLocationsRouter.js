const express=require("express");
const userRouter=express.Router()
var mongoose = require('mongoose');
const User = mongoose.model("UserInfo");
const Venue = mongoose.model("VenueInfo");


const cors = require("cors");
userRouter.use(cors());

userRouter.get("/",async(req,res)=>{
    const {userName}=req.body;
    const favLocations = await User.findOne({userName}).select({favLocations:1})
    res.send(favLocations)
});

/*userRouter.get("/:name",async(req,res)=>{
    const {userName}=req.body;
    const loc_name=req.params.loc_name
    const favLocations = await User.findOne({userName}).select({favLocations:1})
    favLocations.forEach((loc)=>{
        if(loc['loc_name']===loc_name){
            res.send(loc)
        }
    })
})*/

userRouter.post("/",async (req,res)=>{
    const userName=req.body.username
    const venueName = req.body.location
    console.log(venueName)
    const venue=await Venue.findOne({venueName})
    if(venue){
        const venueName=venue.venueName
        const venueID=venue.venueID
        const location={loc_name:venueName,loc_id:venueID}
        const user = await User.findOne({username:userName})
        user.favLocations.push(location)
        user.save()
        res.send(user.favLocations)//Send success message
    }
    else{
        res.send("Can not found")//venue can not be found
    }
});

userRouter.post("/delete",async (req,res)=>{
    const userName=req.body.username
    const venueName = req.body.location
    const venue=await Venue.findOne({venueName:venueName})
    const id=venue.venueID
    const user = await User.findOne({username:userName})
    const locations= user.favLocations
    locations.forEach((loc)=>{
        console.log(loc.loc_id)
        if(loc.loc_id===id){
            locations.remove(loc)
            user.save()
            console.log(loc)
            res.send("success"+loc+" removed from "+userName)
        }
    })
    console.log(venue)
    res.send("Can not find")
});


module.exports=userRouter;