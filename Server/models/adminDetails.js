const mongoose = require("mongoose");

const AdminDetailsSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: { type: String, unique: true },
    password: {type: String,unique:true},
    favLocations: [{loc_name:String,loc_id:Number}]
  },
  {
    collection: "AdminInfo",
  }
);

const Admin = mongoose.model("AdminInfo", AdminDetailsSchema);
module.exports = Admin