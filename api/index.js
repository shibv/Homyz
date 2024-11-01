import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js' 
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import helmet from 'helmet'
import path from "path"
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB') 
})
.catch((err) => {
    console.log(err)
})

// resolves a sequence of paths  into an absolute path.
const __dirname = path.resolve();           

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// PORT
app.listen(3000, () =>{
    console.log('Example app listening on port 3000!!')
})

// Routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listings", listingRouter)

// set static folder
app.use(express.static(path.join(__dirname, '/frontend/dist')))
// handle SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
})
 

// middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

