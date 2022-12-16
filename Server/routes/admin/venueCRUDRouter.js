const express=require("express");
const venueRouter=express.Router()
var mongoose = require('mongoose');

const Venue = mongoose.model("VenueInfo");
const bcrypt = require("bcryptjs");
const cors = require("cors");
venueRouter.use(cors());

venueRouter.post("/api/venue/delete",async (req,res)=>{
    console.log("Entered")
    const venueID=req.body.previousData.venueID;
    const venueToDelete = await Venue.findOne({venueID});
    console.log(venueToDelete)
    await Venue.findOneAndRemove({venueID});
    console.log("Before return")
    return res.send(venueToDelete);

});

venueRouter.post("/api/venues/delete",async(req,res)=>{
    const ids=req.body.ids
    ids.forEach(async (id)=>{
        await Venue.findOneAndRemove({_id:id});
    })
    console.log("Entered to multiple delete")
});

venueRouter.post("/api/venue",async (req,res)=>{
    const {venueName, latitude,longitude} = req.body;


    const biggestId=await Venue.find().sort({venueID:-1})
    const venueID=biggestId[0]['venueID']
    const venue = await Venue.create({
        venueID: venueID+1,
        venueName:venueName,
        latitude:latitude,
        longitude:longitude,
    })
    res.send(venue)


});

venueRouter.put("/api/venue/:id",async (req,res)=>{
    const body = req.body
    const id=body.id
    const update={title: body.data.title,
        dateTime: body.data.dateTime,
        description: body.data.description,
        presenter: body.data.presenter,
        price: body.data.price}
    const filter = { _id: id };
    //const email=body.
    await Venue.updateOne(filter,update)
    const venue = await Venue.findOne(filter);
    return res.send(venue)
});


venueRouter.get("/api/venue",async (req,res)=>{
    const venue = await Venue.find();
    res.send(venue)

});

venueRouter.get("/api/venue/:id",async (req,res)=>{
    const id=req.params.id;
    try {
        const venue = await Venue.findOne({venueID:id});
        res.send(venue)
    }catch (e) {
        res.send(e);
    }
});


module.exports=venueRouter;