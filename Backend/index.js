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
const app = express();
const PORT = 8080;
connectDB();


// app.use(cors({
//     origin:"https://swarnika-79vl.onrender.com",
//     credentials:true,
// }))

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials:true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_UR,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman/server-to-server requests ke liye
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", AuthRouter)
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/collection", collectionRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/banner", bannerRouter);

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