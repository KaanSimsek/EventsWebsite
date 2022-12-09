const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
        venueID: {type: Number, unique: true, required: true},
        venueName: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
    },
    {
        collection: "VenueInfo",
    }
);

const Venue = mongoose.model("VenueInfo", VenueSchema);
module.exports = Venue