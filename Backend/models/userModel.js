import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImg:{
        type:String,
    },
    password:{
        type:String,
    },
    mobile:{
        type:String,
    },
    role:{
        type:String,
        enum:["user", "owner"],
        default:"user",
    },
    profileImg:{
        type:String,
    },
    resetOtp:{
        type:String,
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },
    otpExpires:{
        type:Date
    },
     recentlyViewed: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

},{timestamps:true})

const User = mongoose.model("User", userSchema)
export default User;