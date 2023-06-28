import express from 'express';
import dotenv from "dotenv"
import http from 'http';

const app = express();

dotenv.config();


const port = process.env.PORT || 8000;


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})