import Listing from "../models/listings.model.js";
import { errorHandler } from "../utils/error.js";


// Listing create api here
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

// Listing get api here
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
    return next(errorHandler(404, "Listing not found"));
    }

    try {
         await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
}

// Listing update api here
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404, "Listing not found"));
        }
    //  checking if the user is authorized to update the listing
     if(req.body.userRef !== listing.userRef){
        return next(errorHandler(401, "You are not authorized to delete this listing"));
    }

    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json(listing);
        
    } catch (error) {
        next(error);
    }
}

// Listing get api here
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
        
    } catch (error) {
        next(error);
  
  }
};


export const getListings = async (req, res, next) => {
    try {
     //   --- limit ---
      const limit = parseInt(req.query.limit) || 6;
      // --- start index ---
      const startIndex = parseInt(req.query.startIndex) || 0;
      // --- offer ---
      let offer = req.query.offer;
      if(offer === "false" || offer === undefined) {
        offer = {$in: [true, false]};
      }
      // --- furnished ---
      let furnished = req.query.furnished;
      if(furnished === "false" || furnished === undefined) {
        furnished = {$in: [true, false]};
      }
      // --- parking ---
      let parking = req.query.parking;
      if(parking === "false" || parking === undefined) {
        parking = {$in: [true, false]};
      }
     //  --- type ---
      let type= req.query.type;
      if(type === "all" || type ===undefined) {
        type = {$in: ['rent', 'sale']};
      }
          
      const searchTerm = req.query.searchTerm || "";
      const sort = req.query.sort || "createdAt";
      const order = req.query.order || "desc";

//     --- search ---  
/*
regex search in mongodb is case sensitive and case insensitive search is not supported in mongodb,
option speicify oesn't care about lower and upper case 

 */
      const listings = await Listing.find(
        {
            name :  {$regex: searchTerm, $options: "i"},
            offer,
            furnished,
            parking,
            type,


        }).sort(
            {[sort] : order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
     

        
    } catch (error) {
        next(error);
    }
}