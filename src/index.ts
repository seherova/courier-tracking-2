import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { orderRoutes } from "./Routes/order-routes";
import { customerRoutes } from "./Routes/customer-routes";
import { courierRoutes } from "./Routes/courier-routes";
import { restaurantRoutes } from "./Routes/restaurant-routes";


dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", courierRoutes());
app.use("/", restaurantRoutes());
app.use("/", orderRoutes());
app.use('/', customerRoutes());

app.listen(port, () => {
  console.log(`It is listening now at http://localhost:${port}`);
});

