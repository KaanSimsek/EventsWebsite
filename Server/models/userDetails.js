const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        name: String,
        username: String,
        email: { type: String, unique: true },
        password: {type: String,unique:true},
        favLocations: [{loc_name:String,loc_id:Number}]
    },
    {
        collection: "UserInfo",
    }
);

const User = mongoose.model("UserInfo", UserDetailsSchema);
module.exports = User