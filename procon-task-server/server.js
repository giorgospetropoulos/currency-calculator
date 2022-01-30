import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'

import currenciesRoutes from "./routes/currencies.route.js";
import userRoutes from "./routes/users.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors(
    { 
        origin: '*' 
    }
));

app.use(bodyParser.json());

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection; connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


app.use('/currencies', currenciesRoutes);
app.use('/users', userRoutes);

app.set('query parser', 'simple');

app.get('/', (req, res) => {
    res.send("Hello from homepage");
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));