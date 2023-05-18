import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../config/auth.js";

export default async (req, res, next) =>  {
    const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({error: "token was not provided."});
        }
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0MzYwMDE0LCJleHAiOjE2ODQ5NjQ4MTR9.UhBAvXF3d71WHhXEqw5kxBmTCBnN9obOFxIcflRmhKQ
        const [, token] = authHeader.split(" ");

         try {
           const decoded = await promisify(jwt.verify)(token, authConfig.secret);
           return next();
        }catch(error){
            return res.status(401).json({ error: "Token Invalid."});
        }
}