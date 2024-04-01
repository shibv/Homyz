import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/users.model.js";
import Listing from "../models/listings.model.js";

// User test api here
export const test = (req, res) => {
    res.send("Hello World!!")
}

// User update api here
export const updateUser = async(req, res, next) => {
    // if already register user and the user want to update is different from the logged in user
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "Unauthorized"));
    }
    
    try {
     if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
     }
     // here we areupdating the user data if we have any
     const updateUser  = await User.findByIdAndUpdate(req.params.id, {
         $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
         },

     }, {new: true});

     //separating the passwords
     const {password, ...others} = updateUser._doc;

     res.status(200).json(others);       
    } catch (error) {
        next(error);
    }
}

// User delete api here
export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "Unauthorized"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token")
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
}

// get user listing
export const getUserListings = async(req, res, next) => {


    if(req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
            
        } catch (error) {
            next(error);
        }
    }
   else{
    console.log(req.user.id, req.params.id);
    return next(errorHandler(401, "Unauthorized"));
   }
}

// User get api here
export const getUser = async(req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(errorHandler(404, "User not found"));
        }

        const {password:pass, ...rest} = user._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }
    
}