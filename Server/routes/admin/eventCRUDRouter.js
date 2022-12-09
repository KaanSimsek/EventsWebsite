const express=require("express");
const eventRouter=express.Router()
var mongoose = require('mongoose');
const Event = mongoose.model("EventInfo");
const cors = require("cors");
eventRouter.use(cors());

eventRouter.post("/event/delete",async (req,res)=>{
    console.log("Entered")
    const eventID=req.body.previousData.eventID;
    const eventToDelete = await Event.findOne({eventID});
    console.log(eventToDelete)
    await Event.findOneAndRemove({eventID});
    console.log("Before return")
    return res.send(eventToDelete);

});

eventRouter.post("/events/delete",async(req,res)=>{
    console.log(req.body.ids)
    const ids=req.body.ids
    ids.forEach(async (id)=>{
        await Event.findOneAndRemove({_id:id});
    })
    console.log("Entered to multiple delete")
});

eventRouter.post("/event",async (req,res)=>{
    const { title, venueID, dateTime, description,presenter,price } = req.body;
    console.log(title)

    try {
        const biggestId=await Event.find().sort({eventID:-1})
        const eventID=biggestId[0]['eventID']
        console.log("Helloooo")
        const event = await Event.create({
            eventID: eventID+1,
            title: title,
            venueID: venueID,
            dateTime: dateTime,
            description: description,
            presenter: presenter,
            price: price
        })
        res.send(event)
    }catch (error) {
        console.log("Error")
        return res.send({ status: "error" });
    }

});

eventRouter.put("/event/:id",async (req,res)=>{
    const body = req.body
    const id=body.id
    console.log(body)
    const update={title: body.data.title,
        dateTime: body.data.dateTime,
        description: body.data.description,
        presenter: body.data.presenter,
        price: body.data.price}
    const filter = { _id: id };
    //const email=body.
    await Event.updateOne(filter,update)
    const event = await Event.findOne(filter);
    console.log(event)
    return res.send(event)
});


eventRouter.get("/event",async (req,res)=>{

    const event = await Event.find();
    res.send(event)

});

eventRouter.get("/event/:id",async (req,res)=>{
    const id=req.params.id;
    try {
        const event = await Event.findOne({_id:id});
        res.send(event)
    }catch (e) {
        res.send(e);
    }
});


module.exports=eventRouter;