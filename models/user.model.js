const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
   addresses: [
    {
      label: { type: String, enum: ["home", "work", "other"], default: "home" },
      address: { type: String},
      isDefault: { type: Boolean, default: false }
    }
  ],
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    }
},
{timestamps: true}
);



userSchema.pre("save", async function(next) {//this is a middleware function that will be called before saving the user to the database
    if(!this.isModified("password")){//if the password is not modified, then we don't want to hash it again and again    
        next();//if the password is not modified, then we don't want to hash it again and again
    }
    //from 10 t0 15 is better
    //const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 12);//salt is the number of rounds that will be used to hash the password
    next();
});
userSchema.methods.correctPassword= async function(inputPassword) {//correctPassword is a method that will be called to check if the password is correct and I made it not in 
    return await bcrypt.compare(inputPassword, this.password);//this.password is the password that is stored in the database

    
}

module.exports = mongoose.model("User", userSchema);