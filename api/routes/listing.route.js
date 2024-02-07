import express from 'express';
const router = express.Router();
import {test, updateUser, deleteUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing , deleteListing, updateListing, getListing, getListings} from '../controllers/listing.controller.js';



//  ROute

router.post("/create",verifyToken,  createListing);
router.delete("/delete/:id",verifyToken,  deleteListing)
router.post("/update/:id", verifyToken, updateListing)
router.get("/get/:id",getListing)
router.get("/get",getListings)


export default router