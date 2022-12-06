const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: { type: String, unique: true },
    password: {type: String,unique:true},
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);