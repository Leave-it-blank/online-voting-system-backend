import express from 'express';
import dotenv from "dotenv"
import http from 'http';
import fs from 'fs';
const app = express();
import cors from 'cors';
dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 8000;
//cross orgin resource sharing
app.use(cors());
/** RULES OF OUR API  */
app.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With,Content-Type,Accept, Authorization"
    );
    // set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    next();
});

 
var routes: string[] = [];

fs.readdirSync(__dirname + '/routes').forEach(function (file: string) {
    if (file.substr(file.lastIndexOf('.') + 1) === 'ts') {
        var name = file.substr(0, file.indexOf('.'));
        routes.push(name);
        return;
    }
    var stat = fs.lstatSync(__dirname + '/routes' + '/' + file);
    if (stat.isDirectory()) {
        fs.readdirSync(__dirname + '/routes/' + file).forEach(function (file_2: string) {
            if (file_2.substr(file_2.lastIndexOf('.') + 1) === 'ts') {
                var name = file_2.substr(0, file_2.indexOf('.'));
                routes.push(file + "/" + name);
            }
        });
    }
});

console.log("Current Routes Controllers are: " + routes);

routes.forEach((route) => {
    app.use(require("./routes/" + route));
});
 

/**Error handling */
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})