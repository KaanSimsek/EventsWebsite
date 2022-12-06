const mongoose = require("mongoose");

const AdminDetailsSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: { type: String, unique: true },
    password: {type: String,unique:true},
  },
  {
    collection: "AdminInfo",
  }
);

mongoose.model("AdminInfo", AdminDetailsSchema);