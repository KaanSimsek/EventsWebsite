const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
        eventID: {type: Number, unique: true, required: true},
        title: {type: String, required: true},
        venueID: {type: Number, required: true},
        dateTime: {type: Date, required: true},
        description: {type: String,},
        presenter: {type: String,},
        price: {type: Number, default: 0}
    },
    { collection:"EventInfo"}
);


const Event = mongoose.model("EventInfo", EventSchema);
module.exports = Event