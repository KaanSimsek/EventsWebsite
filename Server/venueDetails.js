const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
    venueID: {type: Number, unique: true, required: true},
    venueName: {type: String, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
  }
);

mongoose.model("VenueInfo", VenueSchema);