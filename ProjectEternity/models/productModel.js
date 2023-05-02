const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      
    },
    last_name: {
      type: String,
    
    },
    username: {
      type: String,
   
      unique:  true,
    },

    email: {
      type: String,
       
      unique:  true,
    },
    password: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
