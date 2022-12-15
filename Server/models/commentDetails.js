const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
        username: String,
        comment: String,
        venueID: Number
    },
    {
        collection: "Comments",
    }
);

const Comment = mongoose.model("Comments", CommentSchema);
module.exports = Comment