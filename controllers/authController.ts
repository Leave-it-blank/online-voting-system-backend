/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import jwt , { Secret, JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import client from '../libs/mongo_client';

const accessTokenSecret = process.env.JWTSECRET as Secret || "secret";
const refreshTokenSecret = process.env.JWTREFRESH_SECRET as Secret || "secret";
const salt_env = process.env.SALT;

const salt = typeof (salt_env) === "string" ? salt_env : "saltafa1$@/wfaw"; // salt for hashing password

async function hashPassword(plaintextPassword: string) {
    const hash = await bcrypt.hash(plaintextPassword + salt, 10);
    return hash;
}
// compare password
async function comparePassword(plaintextPassword: string, hash: string) {
    const result = await bcrypt.compare(plaintextPassword + salt, hash);
    return result;
}
 
const login = async (req: Request, res: Response, next: NextFunction) => {
    var verify = false;
    var data: any = {};
    console.log(req.body)
    data["email"] = req.body.email;
    await client.connect();
    const dbName = "ovs";
    const collectionName = "users";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const query = { $or: [ { email: data["email"] }] };
    const result = await collection.findOne(query);
    console.log(result)
    if (result) {
        verify = await comparePassword(req.body.password, result["password"]);
        console.log(verify)
        if (verify) {
            const accessToken = jwt.sign({ id: result["id"] ,username: result["name"], role: result["role"] , userId: result["id"]}, accessTokenSecret, { expiresIn: '120m' });
            const refreshToken = jwt.sign({ id: result["id"], username: result["name"], role: result["role"] , userId: result["id"]}, refreshTokenSecret);
            return res.status(200).json({
                token: accessToken,
                refresh: refreshToken,
                status: "success",
                message: "Login Successful"
            });

        }else {
            return res.status(403).json({
                status: "error",
                message: "Invalid Username or Password"
            });
        }
    } else {
        return res.status(403).json({
            status: "error",
            message: "Invalid Username or Password"
        });
    }



};

const signup = async (req: Request, res: Response, next: NextFunction) => {
    let data: any = {};
    let response_toUser = "Email or Username aalready registered.";
    data["name"] = req.body.name.toLowerCase();
    data["email"] = req.body.email.toLowerCase();
    data["password"] = await hashPassword(req.body.password);
    data["api_key"] = crypto.randomBytes(20).toString('hex');
    data["role"] = "user";

    await client.connect();
    const dbName = "ovs";
    const collectionName = "users";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const id = Math.floor(Math.random() * 1000000000);
    const query = { $or: [{ email: data["email"] }] };
    const result = await collection.findOne(query);
        if (result) {
            return res.status(403).json({ status: "error" , message: "Email already registered."})
        }
    try {
        const updateData = await collection.insertOne({
            id: id,
            name: data["name"],
            email: data["email"],
            role: data["role"],
            api_key: data["api_key"],
            password: data["password"],
        });
        console.log(`${updateData.acknowledged} documents successfully inserted.\n`);
        // const accessToken = jwt.sign({ username: data["name"], role: data["role"] , userId: id}, accessTokenSecret, { expiresIn: '120m' });

         return res.status(200).json({status: "success" , message: "User Successfully Created."})
      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        return res.status(403).json({ status: "error" , message: "User could not be created."})
      }

};

 
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token: string = typeof (authHeader) != "undefined" ? authHeader?.split(' ')[1] : "";
    if (!token) {
        return res.sendStatus(401);
    }
 
    jwt.verify(token, refreshTokenSecret, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({  id: user.id, username: user.username, role: user.role , userId : user.userId }, accessTokenSecret, { expiresIn: '120m' });

        return res.json({
            accessToken
        });
    });
}
 
const logout = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token: string = typeof (authHeader) != "undefined" ? authHeader.split(' ')[1] : "";
    //removeCacheAccessToken(token);
    res.json({
        message: "Logout successfully.",
        status: "success"
    });

}

const profile = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
   // console.log(authHeader)
    const token: string = typeof (authHeader) != "undefined" ? authHeader.split(' ')[1] : "";
    if (!token) {
        return res.sendStatus(401).json({ status: "error" , message: "Unauthorized."});
    }
    jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403).json({ status: "error" , message: "Unauthorized."});
        }

        return res.json({
            message: "Profile fetched successfully.",
            status: "success",
            user: user
        });
    });
    
}

export default { login, signup, refreshToken, logout , profile }; 