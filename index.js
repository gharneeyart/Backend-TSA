import { connectDb } from "./src/db.config.js";
import dotenv from 'dotenv';
import  express  from "express";
import cors from "cors"
import  authRouter  from './src/routes/auth.js';
import  categoryRouter  from "./src/routes/category.js";
import productRouter from "./src/routes/product.js"
import orderRouter from "./src/routes/order.js"
dotenv.config();

// initialize express server
const app = express();
// middlewares
app.use(express.json());

let corsOptions = { 
    origin : ['http://localhost:5173', 'http://localhost:5174', 'https://fragrance-hub-eight.vercel.app'], 
} 
app.use(cors(corsOptions));

const port = process.env.PORT
const dbUrl = process.env.MONGODB_URL 
// console.log(port);
console.log(dbUrl);
// connect to DB
connectDb(dbUrl);

app.get('/', (req, res) =>{
    res.json({success: true, message: 'OK'});
})

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.listen(port, (req, res) =>{
    console.log(`Fragrance Hub Server listening on ${port}`);
});