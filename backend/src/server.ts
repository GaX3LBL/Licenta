import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import wineRouter from './routers/wine.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

app.use("/api/wines", wineRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);


const port = 5000;

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})


