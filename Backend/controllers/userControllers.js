import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";

export const signup = async (req, res) => {

  try {
    const { name, email, password, role = "user", mobile } = req.body;

    if (!name || !email || !password ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    // Development
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // Production
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "SignUp Successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          profileImg: user.profileImg,
        },
      });
  } catch (error) {
    console.error("SignUp error:", error);
    return res
      .status(500)
      .json({ message: "SignUp failed. Please try again." });
  }
};

// Sign In
export const SignIn = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect email or Password" });
    }

    const token = await genToken(user._id);

    // Development
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // Production
     res.cookie("token", token, {
     httpOnly: true,
     secure: true,
     sameSite: "None",
     maxAge: 7 * 24 * 60 * 60 * 1000,
     });

    return res.status(200).json({
      message: "LogIn Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        profileImg: user.profileImg,
      },
    });


  } catch (error) {
    console.error("SignIn error:", error);

    return res.status(500).json({
      message: "SignIn failed. Please try again.",
    });
  }
};

//  LogOut
export const SignOut = async (req, res) => {
  try {
    const token = req.cookies.token;
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    
    return res.status(200).json({ message: "LogOut Successfully" });
  } catch (error) {
    console.error("SignOut error:", error);
    return res
      .status(500)
      .json({ message: "SignOut failed. Please try again." });
  }
};

export const getCurrentUser = async (req,res) => {

    try {
      // console.log("Hit Get Current User")
        const token = req.cookies.token;

        if (!token) {
          return res.status(401).json({ message: "Unauthorized"});
        }   

        const userId = req.userId;
        if(!userId){
          return  res.status(400).json({message:"UserId Not Found"})
        }

        const user = await User.findById(userId).select("-password")
       
        // .populate("listing","title image1 image2 image3 description rent category city landmark")
       
        if(!user){
          return  res.status(400).json({message:"Current User not found"})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.error("Get Current User Error:", error);
        return res.status(400).json({message:`Get Current User Error ${error}`})
    }

}

//  Send Otp
// export const sendOtp = async (req,res) =>{

//     try {
    
//         const {email} = req.body;
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(404).json({message:"User does not exists."})
//         }

//         const otp = Math.floor(1000 + Math.random() * 9000).toString()
//         user.resetOtp = otp;
//         user.otpExpires = Date.now() + 5*60*1000;
//         user.isOtpVerified = false
        
//         await user.save();
//         sendOtpMail(email, otp);
//         return res.status(200).json({message: "OTP sent Successfully"})

//     } catch (error) {
//         // console.error("Send OTP error:", error);
//         return res.status(500).json({message:"Failed to send OTP. Please try again."})
//     }

// }

// Verify OTP
// export const verifyOtp =  async (req,res) =>{

//     try {
//         const {email,otp} = req.body;
//         const user = await User.findOne({email});
//         if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
//           return  res.status(400).json({message:"Invaild OTP"})
//         }

//         user.isOtpVerified = true;
//         user.resetOtp = undefined;
//         user.otpExpires = undefined;

//         await user.save();

//        return res.status(200).json({message:"OTP Verified Successfully"})

//     } catch (error) {
//        return  res.status(500).json(`verify otp error ${error}`)
//     }
// }

// Reset Password
// export const resetPassword =  async (req,res)=>{

//     try {
//         const {email,newPassword} = req.body;
//           const user = await User.findOne({email});
//         if(!user || !user.isOtpVerified){
//           return  res.status(400).json({message:"otp verification Required"})
//         }
//         const hashedpassword = await bcrypt.hash(newPassword,10);
//         user.password = hashedpassword;

//         user.isOtpVerified = false;

//         await user.save();

//         return res.status(200).json({message:"Password reset Successfully"})

//     } catch (error) {
//          return  res.status(500).json({message:"Reset OTP Error"})
//     }
    
// }

// Google Authencation
// export const googleAuth = async (req, res) =>{
   
//     try {
        
//         const {email,fullName,mobile,profileImg,role } = req.body;
      
//         let user = await User.findOne({email});

//         if(!user){
//             user = await User.create({
//                 fullName,
//                 email,
//                 mobile,
//                 role,
//                 profileImg
//             })
//         }

//         const token = await genToken(user._id);
      
//         // Development
//         res.cookie("token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         });

 
//         // Production
//         //  res.cookie("token", token, {
//         //  httpOnly: true,
//         //  secure: true,
//         //  sameSite: "None",
//         //  maxAge: 7 * 24 * 60 * 60 * 1000,
//         //  });
      

//         return res.status(202).json({message:"SignUp Successfully", user})

//     } catch (error) {
//         console.error("Google Auth error:", error);
//         return res.status(500).json({message:"Google Auth error. Please try again later."})
//     }

// }

// Get Current User
// export const getCurrentUser = async (req,res) => {

//     try {
//       // console.log("Hit Get Current User")
//         const token = req.cookies.token;

//         if (!token) {
//           return res.status(401).json({ message: "Unauthorized"});
//         }   

//         const userId = req.userId;
//         if(!userId){
//           return  res.status(400).json({message:"UserId Not Found"})
//         }

//         const user = await User.findById(userId).select("-password")
       
//         // .populate("listing","title image1 image2 image3 description rent category city landmark")
       
//         if(!user){
//           return  res.status(400).json({message:"Current User not found"})
//         }

//         return res.status(200).json(user)

//     } catch (error) {
//         console.error("Get Current User Error:", error);
//         return res.status(400).json({message:`Get Current User Error ${error}`})
//     }

// }