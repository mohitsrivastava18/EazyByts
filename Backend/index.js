import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import session from "express-session";

const app = express()

dotenv.config()

const allowedOrigins = [
  "https://eazybyts-adminpanel.onrender.com", // your React dev server
   "https://eazybyts-frontend.onrender.com" // another frontend
];

// MIDDLEWARE
// app.use(cors({
//     origin: "*", // your frontend domain
//     credentials: true
// }))
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman or server requests
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // allow cookies/sessions
}));



app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto', // use 'true' in production with HTTPS
        maxAge: 300000 // 5 minutes
    }
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// MONGODB CONNECTION
connDB()

// End point 
app.use("/api/v1", userRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Sever is Litening at PORT", PORT)
})
