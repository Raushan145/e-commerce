import express, { urlencoded } from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import AuthRouter from './routes/userRoutes.js';
import couponRouter from './routes/couponRoutes.js';
import collectionRouter from './routes/collectionRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import bannerRouter from './routes/bannerRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';
const app = express();
const PORT = 8080;
connectDB();
const api = process.env.API_URL


// app.use(cors({
//     origin:"https://swarnika-79vl.onrender.com",
//     credentials:true,
// }))

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
  })
);

// const allowedOrigins = [
//     process.env.CLIENT_URL,
//     "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(`${api}/user`, AuthRouter)
app.use(`${api}/coupon`, couponRouter);
app.use(`${api}/collection`, collectionRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/product`, productRouter);
app.use(`${api}/banner`, bannerRouter);
app.use(`${api}/wishlist`, wishlistRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
      success: false,
      message: err.message || "Something went wrong"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({success: true, message: "Server is healthy" });
});

app.listen(PORT , ()=>{
    console.log(`Server Starting at ${PORT}`)
})