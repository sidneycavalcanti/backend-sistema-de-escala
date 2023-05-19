import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../config/auth";

class SessionsController {
    async create(req,res){  
        const { name, password} = req.body;


        //saber o usuario foi encontrado
        const user = await User.findOne({
            where: { name },
        });

        if(!user) {
            return res.status(401).json({ error: "User not found." });
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: "Password not match."});
        }

        const { id, cat } = user;

        return res.json({
            user: {
                id,
                name,
                cat,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        })
    }
}

export default new SessionsController();