import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { courierRoutes } from './Routes/CourierRoutes';
import { restaurantRoutes } from './Routes/RestaurantRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', courierRoutes());
app.use('/', restaurantRoutes());

app.listen(port, () => {
    console.log(`It is listening now at http://localhost:${port}`);
});
